import express from 'express';
import Quiz from '../models/Quiz.model.js'
import Question from '../models/Question.model.js'
import Attemp from '../models/Attemp.model.js'
import User from '../models/User.model.js'

const router = express.Router()

router.get('/', async(req,res,next)=>{
    try {
        const quiz = await Quiz.find().sort({createdAt:-1}).limit(5)
        if(!quiz||quiz.length<=0){
            res.status(404).json({error:"No quiz found"})
        }
        res.status(200).json({quiz})
    } catch (error) {
        next(error)
    }
})

router.post('/startQuiz',async(req,res,next)=>{
    try {
        const {userId,quizId} = req.query
        if(!userId||userId.trim()===""||!quizId||quizId.trim()===""){
            res.status(404).json({error:"invaild user or quiz"})
        }
        const quiz = await Quiz.findById(quizId)
        const user = await User.findById(userId)
        if(!quiz||!user){
            res.status(404).json({error:"quiz not found"})
        }
        const attemp = await Attemp.create({
            
        })
    } catch (error) {
        next(error)
    }
})

router.get('/addquiz',async(req,res,next)=>{
    try {
        res.status(200).json({message:"Hello world"})
    } catch (error) {
        next(error)
    }
})

export default router