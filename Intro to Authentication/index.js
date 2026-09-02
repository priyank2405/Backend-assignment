const express = require("express");
const app = express();

const connectDB = require("./config/db");
const cookiesParser = require("cookie-parser");
const checkAuth = require("./middlewares/authUser");

const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");
const staticRoutes = require("./routes/static");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());

//Connect routes
app.use("/",  staticRoutes);
app.use("/user",  userRoutes);

//protected routes
app.use("/todo", checkAuth, todoRoutes);

//connect DB
connectDB();

app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});
