const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.secretkey;

function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    secret,
  );
}

function getUser(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {setUser, getUser}