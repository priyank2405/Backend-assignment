const express = require("express");
const app = express();

const connectDB = require("./config/db");
const userRoutes = require("./routes/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(userRoutes);

connectDB();

app.listen(3000, () => {
  console.log("Server is connected to Port 3000!");
});
