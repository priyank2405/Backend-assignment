const express = require('express');
const routes = express.Router();

const Session = require('../models/session');

async function createIndexing(){
    await Session.collection.createIndex(
        {expiresAt: 1}, 
        {
            expireAfterSeconds: 0
        }
    )
}

createIndexing();

routes.get('/api/users', async(req,res) =>{
    const session = await Session.find()
    res.status(200).json({
        data: session,
    })
})

module.exports = routes;