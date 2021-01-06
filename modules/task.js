const uniqid = require("uniqid");
class Task {
  constructor(taskName) {
    this.taskId = uniqid();
    this.taskName = taskName;
    this.status = "pending";
  }
}
module.exports = Task;
