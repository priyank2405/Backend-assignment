const { getUser } = require("../service/auth");

function checkAuth(req, res, next) {
  let uid = req.cookies.uid;
  let user = getUser(uid);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

module.exports = checkAuth;