const mongoose = require("mongoose");
require('dotenv').config();

const connectDB=async()=>{
    try{
        const connectionInstance=await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected");
    }
    catch(err){
            console.log("error in connecting db:",err);
    }
}

connectDB()
module.export = connectDB

