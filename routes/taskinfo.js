const taskRoutes = require("express").Router();
//const bodyParser = require("body-parser");
const tasks = require("../tasks");

// taskRoutes.use(bodyParser.json());

taskRoutes.post("/", (req, res) => {
  const tasksDetails = req.body;
  console.log(tasksDetails);
  let AlteredTask = JSON.parse(JSON.stringify(tasks));
  AlteredTask.push(tasksDetails);
});

taskRoutes.get("/", (req, res) => {
  return res.status(200).json(tasks);
});

taskRoutes.get("/:id", (req, res) => {
  let taskid = req.params.id;

  let resultTask = tasks.filter((task) => task.id === parseInt(taskid));
  if (
    resultTask === null ||
    resultTask === undefined ||
    resultTask.length === 0
  ) {
    return res.status(404).json("Task requested does not exist.");
  }
  console.log(resultTask);
  return res.status(200).json(resultTask);
});

module.exports = taskRoutes;
