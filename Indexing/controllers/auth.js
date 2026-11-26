const Auth = require("../models/auth");
const {setUser} = require('../service/auth');

async function createUser(req, res) {
  let { name, email, password } = req.body;
  const users = await Auth.create({
    name,
    email,
    password,
  });
  res.redirect("/login");
}

async function login(req, res) {
  let { email, password } = req.body;
  const user = await Auth.findOne({
    email: email,
    password: password,
  });
  if (!user) {
    res.redirect("/login");
  } else {
    const token = setUser(user);
    res.cookies('uid', token)
    res.redirect("/insta");
  }
}


module.exports = {createUser, login}