const User = require("../models/user");
const { setUser } = require("../service/auth");

async function createUser(req, res) {
  let { name, email, password } = req.body;
  await User.create({
    name: name,
    email: email,
    password: password,
  });
  res.redirect("/login");
}

async function login(req, res) {
  let { email, password } = req.body;
  let user = await User.findOne({ email, password });
  if (!user) {
    return res.redirect("/login");
  } else {
    const token = setUser(user)
    res.cookie('uid',token)
    res.redirect("/shop");
  }
}

module.exports = { createUser, login };
