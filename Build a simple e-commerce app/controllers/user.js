const User = require("../models/user");
const {v4:uuidv4} = require('uuid');
const { setUser } = require("../service/auth");

async function createUser(req, res) {
  let { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  res.redirect("/login");
}

async function login(req, res) {
  let { email, password } = req.body;
  let user = await User.findOne({ email, password });
  if (!user) {
    res.redirect("/login");
  } else {
    const sessionId = uuidv4();
    setUser(sessionId, user)
    res.cookie('uid', sessionId)
    res.redirect("/shop");
  }
}

module.exports = { createUser, login };
