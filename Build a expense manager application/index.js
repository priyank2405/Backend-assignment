const express = require("express");
const app = express();

const connectDB = require("./config/app");
const cookieParser = require("cookie-parser");
const checkAuth = require("./middlewares/checkAuth");

const expenseRoute = require("./routes/app");
const userRoutes = require("./routes/user");
const staticRoutes = require("./routes/static");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/", staticRoutes);
app.use("/user", userRoutes);
//protected routes
app.use("/app", checkAuth, expenseRoute);

//connect DB
connectDB();

app.listen(3000, () => {
  console.log("Server is connected to port 3000");
});
