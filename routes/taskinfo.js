const taskRoutes = require("express").Router();
const bodyParser = require("body-parser");
const tasks = require("../tasks");
const validateTasks = require("../Validator/validator");
const { isValid, parseISO } = require("date-fns");

taskRoutes.use(bodyParser.json());

taskRoutes.post("/", (req, res) => {
  const tasksDetails = req.body;

  const validationResult = validateTasks(tasksDetails);
  if (validationResult.status) {
    console.log(tasksDetails);
    let AlteredTask = JSON.parse(JSON.stringify(tasks));
    AlteredTask.push(tasksDetails);
    console.log(AlteredTask);
    return res.status(200).json("Task has been added successfully");
  } else {
    return res.status(400).json(validationResult.message);
  }
});
taskRoutes.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { id, title, description, completed, createDate, priority } = req.body;
  const tobeUpdatedTask = tasks.find((task) => task.id === parseInt(taskId));
  console.log(req.body);
  console.log(tobeUpdatedTask);
  if (
    tobeUpdatedTask === null ||
    tobeUpdatedTask === undefined ||
    tobeUpdatedTask.length === 0
  ) {
    return res.status(404).json("Task requested does not exist.");
  }
  //const validationResult = validateTasks(tasksDetails);

  if (
    !isNullOrUndefined(title) &&
    !isNullOrUndefined(completed) &&
    !isNullOrUndefined(description) &&
    !isNullOrUndefined(priority) &&
    !isNullOrUndefined(createDate) &&
    isValidDate(createDate)
  ) {
    tobeUpdatedTask.createDate = parseISO(createDate);
    tobeUpdatedTask.completed = completed;
    tobeUpdatedTask.description = description;
    tobeUpdatedTask.priority = priority;
    tobeUpdatedTask.title = title;
    console.log(tobeUpdatedTask);
    return res.status(200).json("Task has been modified successfully");
  } else {
    return res.status(404).json("Incorrect input format");
  }
});
taskRoutes.get("/", (req, res) => {
  const sortBy = req.query.sortBy;
  const filterBy = req.query.filterBycompleted;
  //const filterBy = req.query.filterBycompleted;
  console.log(sortBy);
  console.log(filterBy);
  let taskDetails = [...tasks];
  if (sortBy == "createDate") {
    if (isValidDate(sortBy))
      return res.status(404).json("Incorrect Date format");

    /*     let taskDateSort = taskDetails.sort((taskA, taskB) => {
      let dateA = new Date(taskA.createDate).getTime();
      let dateB = new Date(taskB.createDate).getTime();
      return dateA > dateB ? 1 : -1;
    }); */
    function sortTasksbyDate(a, b) {
      let dateA = new Date(a.createDate).getTime();
      let dateB = new Date(b.createDate).getTime();
      return dateA > dateB ? 1 : -1;
    }
    let DateSort = taskDetails.sort(sortTasksbyDate);
    /*  const sortByDate = (taskDetails) => {
      const sorter = (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      };
      taskDetails.sort(sorter);
    };
    sortByDate(taskDetails); */
    return res.status(200).json(DateSort);
  }
  if (filterBy) {
    if (typeof filterBy !== "boolean") {
      console.log(typeof filterBy);
      return res.status(404).json("Incorrect format");
    }
    taskDetails = taskDetails.filter((task) => task.completed == filterBy);
    console.log(taskDetails);
  }
  return res.status(200).json(taskDetails);
});

taskRoutes.get("/tasks/priority/:priority", (req, res) => {
  const priority = req.params.priority;
  if (!["high", "low", "medium"].includes(priority.toLowerCase())) {
    return res.status(404).json("Incorrect format");
  }
  const filteredTasks = tasks.filter((task) => {
    return task.priority.toLowerCase() === priority.toLowerCase();
  });
  return res.status(200).json(filteredTasks);
});
taskRoutes.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const istaskExist = tasks.filter((task) => task.id === parseInt(taskId));
  if (
    istaskExist === null ||
    istaskExist === undefined ||
    istaskExist.length === 0
  ) {
    return res.status(404).json("Task requested does not exist.");
  }
  const deletedTask = tasks.filter((task) => task.id !== parseInt(taskId));
  console.log(deletedTask);
  return res.status(200).json("Task requested has been successfully deleted");
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
function isNullOrUndefined(value) {
  return value === null || value === undefined;
}
function isValidDate(dateString) {
  const parsedDate = parseISO(dateString);
  const isValidDate = isValid(parsedDate);
  console.log(isValidDate);
  return isValidDate;
}
module.exports = taskRoutes;
