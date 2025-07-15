import User from "../models/User.model.js"
import jwt from 'jsonwebtoken'
import { ACCESSTOKEN, REFRESHTOKEN } from "../config/env.js";

//temporary auth method will be improved in future

export const auth = async(req,res,next)=>{
    try{
        const {accessToken} = req.cookies;
        if(!accessToken){
            return await refreshTkn(req,res,next)
        }
        
        const decodedAccessTkn = jwt.verify(accessToken,ACCESSTOKEN);
        req.user = {id:decodedAccessTkn.id, role:decodedAccessTkn.role};
        const loggedUser = await User.findById(decodedAccessTkn.id);
        if(!loggedUser){
            return res.status(401).json({error:"unauthorized"})
        }
        next()
    }catch(error){
        if(error.name==='TokenExpiredError'){
            return refreshTkn(req,res,next);
        }else if(error.name==='JsonWebTokenError'){
            return res.status(401).json({error:"Unauthorized"})
        }
        return res.status(500).json({error:"Internal server error"})
    }
}

export const refreshTkn = async(req, res, next)=>{
    try {
        const {refreshToken} = req.cookies;
        if(!refreshToken){
            return res.status(401).json({error:"Unauthorized"})
        }
        const decoded = jwt.verify(refreshToken,REFRESHTOKEN);
        const userdtls = {id:decoded.id,role:decoded.role};
        const user = await User.findById(userdtls.id);
        if(!user){
            return res.status(401).json({error:"Unauthorized"})
        }
        const newAccessToken = jwt.sign({id:user._id,role:user.role},ACCESSTOKEN,{expiresIn:'15m'});
        res.cookie('accessToken',newAccessToken,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:15*60*1000
        })
        req.user={
            id:userdtls.id,
            role:userdtls.role
        }
        next()
    } catch (error) {
        if(error.name==='TokenExpiredError'){
            return res.status(401).json({error:"Unauthorized"})
        }else if(error.name === "JsonWebTokenError"){
            return res.status(401).json({error:"Unauthorized"})
        }
        return res.status(500).json({error:"Internal server error"})
    }
}