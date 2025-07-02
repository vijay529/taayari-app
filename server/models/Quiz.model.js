import mongoose from "mongoose";
import { mainDb } from "../config/db.js";

const quizSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Quiz name is required']
    },
    description:String,
    questionIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      }],
    timeLimit:{
        type:Number,
        default:600
    },
    allowMultipleAttempts:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mainDb.model('Quiz',quizSchema)