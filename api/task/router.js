// build your `/api/tasks` router here
const express = require('express');
const router = express.Router();
const Tasks = require('./model')

router.post("/", validateTask, async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = await Tasks.addTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    if (error.message === "Invalid project_id") {
      res.status(400).json({ message: "Invalid project_id" });
    } else {
      res
        .status(500)
        .json({ message: "Failed to add new task", error: error.message });
    }
  }
});
router.get("/", async (req, res) => {
  try {
    const tasks = await Tasks.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get tasks", error: error.message });
  }
});


function validateTask(req, res, next) {
  const { task_description, project_id } = req.body;

  if (!project_id) {
    return res.status(400).json({ message: "project_id is required" });
  }

  if (!task_description) {
    return res.status(400).json({ message: "task_description is required" });
  }

  next();
}



module.exports = router;