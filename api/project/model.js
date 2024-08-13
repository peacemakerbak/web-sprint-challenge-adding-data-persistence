// build your `Project` model here
const db = require("../../data/dbConfig");

async function add(project) {
  try {
    console.log("Adding project:", project);
    const { project_name, project_description, project_completed } = project;


    const existingProject = await findByName(project_name);
    if (existingProject) {
      return existingProject;
    }

    const projectForDb = {
      project_name,
      project_description,
      project_completed: project_completed ? 1 : 0, 
    };

    const [id] = await db("projects").insert(projectForDb, "project_id");
    const projectId = id.project_id ? id.project_id : id; 

    console.log("Inserted project ID:", projectId);
    return findById(projectId);
  } catch (error) {
    console.error("Error adding new project:", error);
    throw new Error("Failed to add new project");
  }
}

async function findByName(project_name) {
  console.log("Searching for project by name:", project_name);
  return db("projects").where({ project_name }).first();
}

async function findById(id) {
  console.log("Searching for project by ID:", id);

  try {
    const project = await db("projects").where({ project_id: id }).first();

    if (!project) {
      return null; // Return null if project is not found
    }

    return {
      ...project,
      project_completed: !!project.project_completed,
    };
  } catch (error) {
    console.error("Error finding project by ID:", error);
    throw new Error("Failed to find project by ID");
  }
}

function getAll() {
  return db("projects").then((projects) =>
    projects.map((project) => ({
      ...project,
      project_completed: !!project.project_completed,
    }))
  );
}

module.exports = {
  add,
  findById,
  getAll,
  findByName,
};