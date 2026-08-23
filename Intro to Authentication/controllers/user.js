const User = require('../models/user');

async function createUser(req,res) {
    const {name, email, password} = req.body;
    await User.create({
        name, email, password
    }) 
    res.redirect('/todo')
}



async function login(req,res) {
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user) res.redirect('login');
    res.redirect('/todo')
}

module.exports = {createUser, login}