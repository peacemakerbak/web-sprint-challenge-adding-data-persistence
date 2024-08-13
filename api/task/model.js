// build your `Task` model here
const db = require("../../data/dbConfig");

async function addTask(task) {
  try {
    
    const project = await db("projects")
      .where("project_id", task.project_id)
      .first();
    if (!project) {
      throw new Error("Invalid project_id");
    }

    const taskForDb = {
      ...task,
      task_completed: task.task_completed ? 1 : 0,
    };

    const [taskId] = await db("tasks").insert(taskForDb);
    const newTask = await findTaskById(taskId);
    return newTask;
  } catch (error) {
    console.error("Failed to add new task:", error);
    throw error; 
  }
}


function getAllTasks() {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.project_id")
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      db.raw(
        "CASE WHEN t.task_completed = 0 THEN 0 ELSE 1 END as task_completed"
      ), 
      "p.project_name",
      "p.project_description"
    )
    .then((tasks) =>
      tasks.map((task) => ({
        ...task,
        task_completed: task.task_completed === 1, 
      }))
    );
}




function findTaskById(id) {
  return db("tasks")
    .where({ task_id: id })
    .first()
    .then((task) => {
      if (!task) {
        console.log("Task not found");
      }
      return {
        ...task,
        task_completed: !!task.task_completed,
      };
    });
}

module.exports = {
  addTask,
  findTaskById,
  getAllTasks,
}