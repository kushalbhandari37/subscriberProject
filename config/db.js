const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const db = process.env.DBCONFIG;

//Connecting Database
const connectDB = async ()=>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        console.log("Database Connected Successfully")
    } catch (error) {
        console.error(error.message);        
    }
}

module.exports = connectDB;
