const express = require("express");
const {
  getAlltask,
  createtask,
  verifyPostRequest,
  getTaskById,
  updateTask,
  deleteTaskById,
} = require("../controller/taskController");

const router = express.Router();

router.route("/tasks").get(getAlltask).post(createtask);
router
  .route("/tasks/:id")
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTaskById);
module.exports = router;
