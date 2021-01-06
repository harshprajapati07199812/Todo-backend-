const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

const taskRouter = require("./router/todorouter");

const app = express();
app.use(express.json());

app.use("/todoList", taskRouter);

mongoose.connect(
  process.env.DATABASE_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, connection) => {
    if (err) {
      console.log(err);
    }
    console.log("Successfully connected to the database");
  }
);

app.listen(
  process.env.PORT,
  console.log(`App started on port ${process.env.PORT}`)
);
