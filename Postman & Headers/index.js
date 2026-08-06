const express = require("express");
const app = express();

const users = require("./users.json");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  res.render("users", { users });
});
app.get("/api/users", (req, res) => {
  return res.json(users);
});
app.get("/api/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let user = users.find((user) => user.id === id);
  return res.json(user);
});

app.listen(3000, () => {
  console.log("Server is running");
});
