require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Db connected");
});

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  isCompleted: { type: Boolean, default: false },
});

const Todos = mongoose.model("todo", todoSchema);

app.get("/", async (req, res) => {
  let todos = await Todos.find({isCompleted: false});
  res.render("index", { todos: todos });
});
app.get("/complete", async (req, res) => {
  let todos = await Todos.find({isCompleted: true});
  res.render("completed", { todos: todos });
});

app.post("/todo", async (req, res) => {
  const { title } = req.body;
  await Todos.create({
    title: title,
  });
  res.redirect("/");
});

app.post("/todo/:id/complete", async (req, res) => {
  await Todos.findByIdAndUpdate(req.params.id,{
    isCompleted: true,
     });
     res.redirect('/');
  });

  app.post("/todo/:id/delete", async (req, res) => {
  await Todos.findByIdAndDelete(req.params.id);
     res.redirect('/complete');
  });

app.listen(3000, () => {
  console.log("Server is connected to Port 3000");
});
