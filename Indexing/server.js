const express = require("express");
const app = express();

const connectDB = require("./config/db");
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(userRoutes);
app.use(postRoutes);


connectDB();

app.listen(3000, () => {
  console.log("Server is connected to port 3000!");
});
