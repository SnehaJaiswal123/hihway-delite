const mongoose = require('mongoose');

const userschema= mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contactMode:{
        type:String,
        required:true
    }
})

const User=mongoose.model('User',userschema)

module.exports=User