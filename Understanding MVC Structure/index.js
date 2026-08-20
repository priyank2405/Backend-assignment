const express = require('express');
const app = express();
const connectDB = require('./config/db')
const userRouter = require('./routes/user')
const logger = require('./middlewares/logger')
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB()


app.use('/api/users',logger, userRouter)

app.listen(3000, () =>{
    console.log('Server is running on Port 3000')
})