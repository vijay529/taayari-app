import mongoose from 'mongoose';
import { mainDb } from '../config/db'; 
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        minLength: [2, "Name must have atleast 2 characters"],
        maxLength: [50, "Name cannot exceed 50 characters"],
    },
    username:{
        type: String,
        required: [true,"Username is required"],
        minLength: [5,"Username must have atleast 5 characters"],
        maxLength: [20, "Username cannot exceed 20 characters"],
        trim:true,
        unique:true,
        match:['/^[a-z0-9_]+$/',"Username can only contains lowercase letters, numbers and underscores"]
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique: true,
        trim: true,
        match:['/.+@.+\..+/','Please enter a valid email'],
        lowercase:true
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minLength:[6, 'Password must have atleast 6 characters']
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    refreshToken:String
},{timestamps:true})

userSchema.pre('save', async(next)=>{
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10);
    next()
})

userSchema.methods.comparePassword = function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password)
}

export default mainDb.model('User', userSchema)