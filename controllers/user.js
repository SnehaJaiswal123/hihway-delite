const Otp = require("../models/otp");
const User = require("../models/user");
const nodemailer = require("../utils/nodemailer");
const validator = require("email-validator");
const otpGenerator = require("otp-generator");

const Signup = async (req, res) => {
  try {
    const { fname, lname, email, password, contactMode } = req.body;
    if (!fname || !email || !lname || !password || !contactMode) {
      return res.status(400).json({
        success: false,
        message: "Provide all the fields",
      });
    }
    if (!validator.validate(email)) {
      return res.status(400).json({
        success: false,
        message: "Provide valid email address",
      });
    }
    const userExist = await User.find({ email });
    if (userExist.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User with this email address already exist",
      });
    }
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false
    });
    await nodemailer(email, otp);
    const emailExist=await Otp.findOne({email})
    if(emailExist){
      await Otp.findOneAndUpdate({email},{otp});
      return res.status(201).send({
        success: true,
      });
    }
    await Otp.create({
      email,
      otp,
    });
    return res.status(201).send({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: true,
      message: "Something went wrong",
    });
  }
};

const Login = async (req, res) => {
  try {    
    const { email, password } = req.body;
    
    if (!password || !email) {
      return res.status(400).json({
        success: false,
        message: "Provide all the fields",
      });
    }
    const emailExist = await User.find({ email });
    if (emailExist.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Email not registed",
      });
    }
    const user = await User.findOne({ email });
    if (user.password != password) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }
    return res.status(201).send({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: true,
      message: "Something went wrong",
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { otp, fname, lname, email, password, contactMode } = req.body;
        
    const emailExist=await Otp.findOne({email});
    if(!emailExist){
      return res.status(400).send({
        success:false,
        message:"Singup again"
      })
    }
    const existedOtp=emailExist.otp;
    console.log(otp,existedOtp);
    
    if(existedOtp==otp){
      await User.create({
        fname,
        lname,
        email,
        password,
        contactMode,
      })
      return res.status(200).send({
        success:true,
        message:"Email verified"
      })
    }
    return res.status(400).send({
      success:false,
      message:"Wrong Otp"
    })

  } catch (e) {
    console.log(e);
    
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { Signup, Login, verifyOTP };
