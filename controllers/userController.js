const users = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const secret = process.env.JWT_SECRET
// console.log(secret)
const userSignup = async(req, resp)=>{
    try {
        const {email, password, name} = req.body;
        const findUser = await users.findOne({email})
        if(findUser){
            return  resp.send({msg : "User is already exist for this email adderss use another email"})
        }
        
        const bcryptPassword = await bcrypt.hash(password, 10)
        const newUser = new users({email, password:bcryptPassword, name})
        await newUser.save()
        
        const token = jwt.sign({ id: newUser._id, name: newUser.name, email: newUser.email, watchlist: newUser.watchlist }, secret, { expiresIn: "1h" });
        console.log(token)

        const payload = { id: newUser._id, name: newUser.name, email: newUser.email, watchlist: newUser.watchlist };

        // console.log(payload)

        resp.status(200).json({ msg: "User created successfully", data: payload, token});

    } catch (error) {
        resp.status(400).json("Internal server error")
    }
}
const userLogin = async(req, resp)=>{
    try {
        const {email, password} = req.body;
    } catch (error) {
        
    }
}

exports.userController = {userLogin, userSignup}