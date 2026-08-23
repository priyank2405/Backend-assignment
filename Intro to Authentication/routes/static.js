const express = require('express');
const routes = express.Router();

routes.get('/register', (req,res) =>{
    return res.render('register')
})
routes.get('/login', (req,res) =>{
    return res.render('login')
})

module.exports = routes;
