const express = require('express');
const routes = express.Router();

const {getTodos, createTodos, markCompleted, getCompletedTodos, deleteTodos} = require('../controllers/todo');

routes.get('/', getTodos);

routes.post('/', createTodos)

routes.post('/:id/complete', markCompleted);

routes.get('/complete', getCompletedTodos);

routes.post('/:id/delete', deleteTodos);


module.exports = routes;