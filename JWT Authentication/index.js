const express = require("express");
const app = express();

const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const staticRoutes = require("./routes/static");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", staticRoutes);
app.use("/user", userRoutes);
app.use("/shop", productRoutes);

//connect DB
connectDB();

app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});
