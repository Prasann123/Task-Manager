const tasks = require("../tasks");

const validateTasks = ({
  id,
  title,
  description,
  completed,
  createDate,
  priority,
}) => {
  if (!id || !title || !description || !createDate || !priority) {
    return { status: false, message: "All fields are required" };
  }

  if (tasks.some((task) => task.id === id)) {
    return { status: false, message: "Task with the same id already exists" };
  }

  if (!["High", "Low", "Medium"].includes(priority)) {
    return { status: false, message: "Invalid priority" };
  }
  if (typeof completed !== Boolean) {
    return { status: false, message: "Invalid completion status" };
  }
};

module.exports = validateTasks;
