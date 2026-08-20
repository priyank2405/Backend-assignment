const express = require('express');
const User = require('../modules/User');

async function getUsers(req, res) {
    let users = await User.find({})
    res.json(users);
}

async function createUser(req, res) {
    let {name, email} = req.body;
    let user = await User.create({
        name,
        email
    })
    res.status(201).json(user);
}

async function editUser(req, res) {
  
    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email
    },{
        new:true
    }
);
    res.status(200).json(user);
}

async function deleteUser(req, res) {
  
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
}

module.exports = {getUsers, createUser, editUser, deleteUser}