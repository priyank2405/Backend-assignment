const express = require('express');
const routes = express.Router();

const Post = require('../models/post');

// Task 3
// async function createIndexing(){
//     await Post.collection.createIndex({
//         hashtags: 1,
//     })
// }

// createIndexing();

// routes.get('/api/posts', async(req,res) =>{

//     let {hashtags} = req.query;
//     const users = await Post.find({hashtags})
//     res.status(200).json({
//         data: users,
//     })
// })


//Task 4
async function createIndexing(){
    await Post.collection.createIndex({isPublished:1}, {
        name: "published_non_deleted_index",
        partialFilterExpression: {
            isPublished: true,
            isDeleted: false
        }
    })
}

createIndexing();

routes.get('/api/posts/published', async(req,res) =>{
    const posts = await Post.find({isPublished:true, isDeleted:false})
    res.status(200).json({
        data: posts,
    })
})

module.exports = routes;