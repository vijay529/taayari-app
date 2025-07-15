import express from 'express'
import User from '../models/User.model.js'
import jwt from 'jsonwebtoken'
import { ACCESSTOKEN, REFRESHTOKEN } from '../config/env.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', async(req,res,next)=>{
    try {
        const {email, password, username, name} = req.body;

        const isValidField = [name, email, username, password].every((field)=>field&&field.trim()!=="");

        if(!isValidField){
            return res.status(400).json({error:"All fields are required"});
        }

        const existingUser = await User.findOne({$or:[
            {email:email},
            {username:username}
        ]})

        if(existingUser){
            return res.status(401).json({error:"User already exists"});
        }

        const newUser = new User({
            name,email,password,username
        });

        const accessToken = jwt.sign({id:newUser._id,role:newUser.role}, ACCESSTOKEN, {expiresIn:'15m'});
        const refreshToken = jwt.sign({id:newUser._id,role:newUser.role},REFRESHTOKEN,{expiresIn:'7d'});
        newUser.refreshToken = refreshToken;
        await newUser.save();
        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:15*60*1000
        })
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            sameSite:'strict',
            secure:false,
            maxAge:7*24*60*60*1000
        })
        res.status(201).json({
            user:{
                id:newUser._id,
                username,
                email,
                role:newUser.role
            }
        })
        next()
    } catch (error) {
        next(error)
    }
})

router.post('/signin', async(req,res,next)=>{
    try {
        const {email,password,username} = req.body;
        if(!password?.trim()||(!email?.trim()&&!username?.trim())){
            return res.status(401).json({error:"Invalid credentials"});
        }
        const user = await User.findOne({$or:[
            {email:email},
            {username:username}
        ]})
        if(!user){
            return res.status(401).json({error:"Invalid credentials"})
        }
        const isCorrectPassword = await user.comparePassword(password);
        if(!isCorrectPassword){
            return res.status(401).json({error:"Invalid credentials"})
        }

        const accessToken = jwt.sign({id:user._id, role:user.role}, ACCESSTOKEN,{expiresIn:'15m'} );
        const refreshToken = jwt.sign({id:user._id, role:user.role}, REFRESHTOKEN,{expiresIn:'7d'});
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:15*60*1000
        })
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            sameSite:'strict',
            secure:false,
            maxAge:7*24*60*60*1000
        })
        res.status(200).json({
            user:{
                username:user.username,
                email:user.email,
                role:user.role,
            }
        })
    } catch (error) {
        next(error)
    }
})

router.post('/logout', auth, async(req,res,next)=>{
    try {
        const {id} = req.user
        await User.findByIdAndUpdate(id, {
            refreshToken:""
        });
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken')
        res.status(200).json({message:"logged out"})
    } catch (error) {
        next(error)
    }
})



export default router;