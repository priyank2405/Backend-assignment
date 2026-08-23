const express = require('express');
const app = express()
const connectDB = require('./config/db')
const todoRouter = require('./routes/todo')
const userRouter = require('./routes/user')
const staticRouter = require('./routes/static')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

connectDB()
app.use('/todo', todoRouter);
app.use('/user', userRouter);
app.use('/', staticRouter);



app.listen(3000, () =>{
    console.log('Server is running on Port 3000');
})