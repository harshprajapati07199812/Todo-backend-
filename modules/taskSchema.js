const mongoose = require("mongoose");
const uniqid = require("uniqid");

const TaskSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uniqid(),
  },

  taskId: {
    type: String,
    unique: true,
    required: true,
    sparse: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "completed"],
    required: true,
  },
});

// module.exports.myModule = mongoose.model("myModule", TaskSchema);
myModel = mongoose.model("myModel", TaskSchema);
module.exports.myModel = myModel;
