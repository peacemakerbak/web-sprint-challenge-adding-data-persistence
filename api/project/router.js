// build your `/api/projects` router here
const express = require("express");
const router = express.Router();
const Projects = require("./model");


router.post("/", async (req, res) => {
  try {
    const { project_name, project_description, project_completed } = req.body;

    if (!project_name) {
      return res
        .status(400)
        .json({ message: "project_name" });
    }

    const newProject = await Projects.add({
      project_name,
      project_description,
      project_completed,
    });

    const responseProject = {
      ...newProject,
      project_completed: !!newProject.project_completed,
    };

    res.status(201).json(responseProject);
  } catch (error) {
    console.error("Error in POST /api/projects:", error);
    res.status(500).json({ message: "Failed to add new project" });
  }
});







router.get("/", async (req, res) => {
  try{
    const projects = await Projects.getAll();
    console.log(projects);
    res.status(200).json(projects);
  } catch (error){
     console.error("Error in POST /api/projects:", error);
    res.status(500).json({message: error.message})
  }
});




router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: 'Something went wrong inside the project router',
        message: err.message,
        stack: err.stack, 
    })
})
module.exports = router 