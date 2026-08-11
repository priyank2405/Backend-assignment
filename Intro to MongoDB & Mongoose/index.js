const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://priyankk2405_db_user:KAty1YXPIcUp5AGs@backend-cohort.p0uy0qb.mongodb.net/?appName=backend-cohort",
  )
  .then(() => {
    console.log("DB is connect");
  });

// Create a Schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
});

// Create Model
const User = mongoose.model("users", userSchema);

app.get("/api/users", async (req, res) => {
  let users = await User.find({});
  return res.json(users);
});

app.get("/api/users/:id", async (req, res) => {
  let users = await User.findById(req.params.id)
  return res.json(users);
});

app.delete("/api/users/:id", async (req, res) => {
  let users = await User.findByIdAndDelete(req.params.id);
  return res.json(users);
});

app.patch("/api/users/:id", async (req, res) => {
  let users = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
  });
  return res.json(users);
});

app.post("/api/users", async (req, res) => {
  let { name, email } = req.body;
  let data = await User.create({
    name: name,
    email: email,
  });
  console.log(data);
  return res.json("User is added");
});

app.listen(3000, () => {
  console.log("server is running in port 3000");
});
