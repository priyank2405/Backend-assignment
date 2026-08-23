const Todo = require("../models/todo");

async function getTodos(req, res) {
  let todos = await Todo.find({ isCompleted: false });
  res.render("index", { todos: todos });
}

async function createTodos(req, res) {
  let { title } = req.body;
  let data = await Todo.create({
    title: title,
  });
  res.redirect("/todo");
}

async function markCompleted(req, res) {
  await Todo.findByIdAndUpdate(req.params.id, {
    isCompleted: true,
  });
  res.redirect("/todo");
}

async function getCompletedTodos(req, res) {
    let todos = await Todo.find({ isCompleted: true });
    res.render("completed", { todos: todos });
}
async function deleteTodos(req, res) {
     await Todo.findByIdAndDelete(req.params.id)

    res.redirect('/todo')
}

module.exports = { getTodos, createTodos, markCompleted, getCompletedTodos, deleteTodos};
