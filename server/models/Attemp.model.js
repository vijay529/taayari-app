import mongoose from "mongoose";
import { mainDb } from "../config/db";

const ansSchema = new mongoose.Schema({
  questionId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Question',
    required:true
  },
  selectedIndex:{
    type:Number
  },
  answeredAt:{
    type:Date,
    default:Date.now
  },
  duration:{
    type:Number //in seconds
  },
  ipAddress: {
    type: String
  },
  deviceInfo: {
    type: String
  }
},{_id:false})

const attemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required:true },
  answers: [ansSchema],
  status:{
    type:String,
    enum:['in-progress,submitted,expired'],
    default:'in-progress'
  },
  startedAt: {
    type:Date,
    default:Date.now,
    required:true
  },
  expiresAt: {
    type:Date,
    required:true
  },
  currentQuestionIndex:{
    type:Number,
    default:0
  },
  duration: Number, // in seconds
  score: {
    type:Number,
    default:0
  },
  submittedAt:{
    type:Date
  },
});

export default mainDb.model('Attempt', attemptSchema);
