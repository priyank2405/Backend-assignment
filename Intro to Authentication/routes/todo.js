const express = require('express');
const routes = express.Router();

const {getTodos, createTodos, markComplete} = require("../controllers/todo")

routes.get("/", getTodos);
routes.post("/", createTodos);
routes.post("/:id/complete", markComplete);


module.exports = routes;    
