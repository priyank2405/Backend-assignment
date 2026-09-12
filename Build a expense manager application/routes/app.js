const express = require('express');
const routes = express.Router();

const {getExpenses, createExpenses, editExpenses, editExpense, deleteExpenses} = require('../controllers/app')


routes.get('/', getExpenses);
routes.post('/', createExpenses);
routes.post('/:id/edit', editExpenses);
routes.get('/:id/edit', editExpense);
routes.post('/:id/delete', deleteExpenses);

module.exports = routes;