const express = require('express');
const app = express();

const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')


const productRoute = require('./routes/product')
const userRoute = require('./routes/user')
const staticRoute = require('./routes/static')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//routes
app.use('/', staticRoute);
app.use('/user', userRoute);
//protected route
app.use('/shop', productRoute);

//connect DB
connectDB();

app.listen(8000, () =>{
    console.log('Server is running on port 8000!')
})