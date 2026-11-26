const express = require('express');
const routes = express.Router();

const User = require('../models/user')


async function createIndexing(){
    //Task 1
    await User.collection.createIndex({
        city: 1,
    })

    // Task 2
    await User.collection.createIndex({
        city: 1,
        gender: 1,
    })
}

createIndexing();

routes.get('/api/users', async(req,res) =>{
    

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;

    const skip = (page - 1) * limit;
    const filter = {city:"Delhi", gender:"Male"};
    
    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    
    const users = await User.find({ city: "Delhi" , gender: "Male"}).skip(skip).limit(limit);
    res.status(200).json({
        data:users,
        totalUsers,
        totalPages,
        currentPage: page,
        limit,
    })
})

module.exports = routes;