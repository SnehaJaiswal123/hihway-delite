const nodemailer = require('nodemailer');
require('dotenv').config()

const mail=async(email,otp)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider
        auth: {
          user: process.env.AUTH, // Your email address
          pass: process.env.PASS, // Your email password
        },
      });
      
      // Set up email data
      const mailOptions = {
        from: '"Sneha Jaiswal" <jaiswalsneha903@gmail.com>', // Sender address
        to: email, // List of recipients
        subject: 'OTP Verification', // Subject line
        text: 'Hello, this is a test email sent using Nodemailer!', // Plain text body
        html: `<p>Your OTP is:${otp}</p>`, // HTML body
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log('Error: ', error);
        }
        console.log('Email sent: ' + info.response);
      });
      
}
module.exports=mail;