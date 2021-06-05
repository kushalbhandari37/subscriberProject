const express = require('express');
const path = require('path');
const home = require('./routes/home');
const emailRoute = require('./routes/email');
const connectDB = require('./config/db');
const app = express();
connectDB();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views',path.join(__dirname,'./views'))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//Routes
app.use('/', home);
app.use('/email', emailRoute);

const PORT = process.env.PORT || 5000;

//Starts Server
app.listen(PORT,()=>{
    console.log('Server has started')
})