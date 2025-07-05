import mongoose from "mongoose";
import { mainDb } from "../config/db.js";

const questionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Question title is required'],
        trim:true
    },
    options:{
        type:[String],
        validate:v=>v.length>=2
    },
    correctAnswerIndex:{
        type:Number,
        required:true,
        validate:{
            validator:function(v){
                return v>=0 && v< this.options.length;
            },
            message:'Index out of range'
        },
    },
    duration:{
        type:Number,
        default:60 // in seconds
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

export default mainDb.model('Question', questionSchema)