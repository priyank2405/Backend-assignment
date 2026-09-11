const express = require("express");
const routes = express.Router();

const {createUser, login} = require('../controllers/user')

routes.post('/', createUser)
routes.post('/login', login)

module.exports = routes;
