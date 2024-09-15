const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()
const port=process.env.port||7000;
const userRouter = require('./routes/user.js')
app.use(bodyParser.urlencoded({extended: true}));
require('./db/connection.js')
app.use(express.json());
app.use(
    cors({
        origin:"*"
    })
)
app.use('/api',userRouter)

app.listen(port,console.log("Server is runnning"))
