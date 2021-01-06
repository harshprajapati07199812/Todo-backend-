const fs = require("fs");
const path = require("path");
const Task = require("../modules/task");
const myModel = require("../modules/taskSchema");
const uniqid = require("uniqid");
const filename = path.join(__dirname, "..", "data", "task.json");
const task = JSON.parse(fs.readFileSync(filename, "utf-8"));
console.log(typeof task);
//middleware
// module.exports.verifyPostRequest = (req, res, next) => {
//   const requiredProperties = ["taskName", "taskId"];
//   let result = requiredProperties.every((key) => {
//     return req.body[key];
//   });

//   if (!result) {
//     res.status(400).json({
//       status: "unsucces",
//       message: "request is not valid",
//     });
//   } else {
//     next();
//   }
// };

module.exports.getAlltask = async (req, res, next) => {
  let keys = ["taskId", "taskName", "status"];
  queryfilter = {};
  flag = 0;
  objectqueries = Object.keys(req.query);
  if (objectqueries.length !== 0) {
    objectqueries.forEach((key) => {
      if (keys.includes(key)) {
        queryfilter[key] = req.query[key];
        flag = 1;
      }
    });
  }
  if (flag) {
    const tasks = await Task.find(queryfilter);
    res.json({
      message: "successful",
      data: tasks,
    });
  } else {
    sendResponse(200, "Successful", [], req, res);
  }
  res.status(200).json({
    status: "successful",
    data: queryfilter,
  });
};

module.exports.createtask = async (req, res, next) => {
  console.log();

  try {
    const newtask = new myModel({ taskName: req.body.taskName });
    newtask.save(() => {
      res.status(200).json(newtask);
    });
  } catch (err) {
    console.log("createTask", err);
  }
};

module.exports.getTaskById = async (req, res, next) => {
  try {
    let task = await Task.findOne({ taskId: req.params.taskId });
    res.status(201).json(task);
  } catch (err) {
    console.log("getTaskbyid", err);
  }
};
module.exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.updateOne(
      { taskId: req.params.taskId },
      { status: req.body.status }
    );
    res.status(201).json(task);
  } catch (err) {
    console.log("updateTask", err);
  }
};

module.exports.deleteTaskById = async (req, res, next) => {
  try {
    let task = await Task.deleteOne({ taskId: req.params.taskId });
    res.status(201).json(task);
  } catch (err) {
    console.log("deleteTaskById", err);
  }
};

// module.exports.getAlltask = getAlltask;
// module.exports.createtask = createtask;
// module.exports.verifyPostRequest = verifyPostRequest;
// module.exports.getTaskById = getTaskById;
// module.exports.updateTask = updateTask;
// module.exports.deleteTaskById = deleteTaskById;

// const createtask = (req, res) => {
//   console.log(req.body);
//   let newTask = new Task(req.body.taskName);
//   task.push(newTask);
//   fs.writeFile(filename, JSON.stringify(task, null, 2), (err) => {
//     if (err) {
//       res.status(500).json({
//         status: "internal error",
//       });
//       return err;
//     }
//     res.status(201).json({
//       status: "successsful",
//       data: [newTask],
//     });
//   });
// };

// const getTaskById = (req, res) => {
//   const taskid = req.params.id;
//   const taskshow = task.filter((tasks) => tasks.taskId == taskid);
//   res.status(200).json({
//     status: "successful",
//     data: taskshow,
//   });
// };

// const updateTask = (req, res) => {
//   const id = req.params.id;
//   let upadatedTask = req.body;
//   task.map((obj, index) => {
//     if (id == obj.taskId) {
//       console.log(task[index]);
//       task[index].status = upadatedTask.status;
//       console.log(task[index]);
//       return res.status(200).json({
//         status: "successsful",
//         data: [task[index]],
//       });
//     }
//   });
// };

// const deleteTaskById = (req, res) => {
//   const taskid = req.params.id;
//   task.forEach((element, index) => {
//     if ((element.taskId = taskid));
//     task.splice(index, 1);
//   });
//   res.status(200).json({
//     status: "successful",
//     data: task,
//   });
// };
