const express = require('express');
const router = express.Router();
const {Signup, Login, verifyOTP} = require('../controllers/user')

router.post('/signup',Signup);
router.post('/signin',Login);
router.post('/verify',verifyOTP);

module.exports = router;