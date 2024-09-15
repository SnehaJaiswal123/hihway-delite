const mongoose = require('mongoose');

const otpSchema= mongoose.Schema({
    email:{
        type:String
    },
    otp:{
        type:String
    }
})

const Otp=mongoose.model('Otp',otpSchema)

module.exports=Otp