const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  res.render("submitSuccess", {
    fullName: req.body.fullName,
    email: req.body.email,
    age: req.body.age,
    favoriteColor: req.body.favoriteColor,
  });
});

app.use((req, res) => {
  res.status(404).render("404");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
