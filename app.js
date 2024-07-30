const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes')
const app = express()
require('dotenv').config();
app.use(express.json())


// db connection
const dbUrl = process.env.MONGO_URL
const port = process.env.PORT
const secret = process.env.JWT_SECRET
console.log(port,secret)
mongoose.connect(dbUrl)
.then(()=>{
    console.log("Connected to mongoDB")
    app.listen(port, ()=>{
        console.log(`Server is running at port ${port}`);
    });
})
.catch((error)=>{
    console.log("Error in conection to MongoDB",error)
})


// router 
app.use('/v1/user', userRouter)

module.exports = app;