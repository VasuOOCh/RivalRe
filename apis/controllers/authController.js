import { createError } from "../CustomError.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next) => {
   try {
    console.log(req.body);

    const existingUser = await User.findOne({
        $or : [{username : req.body.username}, {email : req.body.email}]
    })
    if(existingUser) return next(createError(400, "User already exists with given username/email"));

    const hashedPassword = await bcrypt.hash(req.body.password,10)

    const newUser = new User({
        ...req.body,
        password : hashedPassword
    });
    await newUser.save();
    res.status(201).json("User created successfully")
   } catch (error) {
    next(error)
   }
}

export const signin = async (req,res,next) => {
    try {
 
     const existingUser = await User.findOne({
         username : req.body.username,
     })
    if(!existingUser) return next(createError(400, "Invalid credentials"))
        // console.log(existingUser);

    const isPasswordCorrect = await bcrypt.compare(req.body.password, existingUser.password);

    if(!isPasswordCorrect) return next(createError(401, "Invalid credentials"));

    const token = jwt.sign({
        userId : existingUser._id
    }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    const {password, ...otherInfo} = existingUser._doc;
    res.cookie('token', token, {maxAge : 7*24*60*60*1000, httpOnly : true}).json(otherInfo)

    } catch (error) {
     next(error)
    }
 }

export const logout = async (req,res,next) => {
    try {
        res.clearCookie('token').status(200).json("logged out");
        req.user = null;
    } catch (error) {
        next(error)
    }
}