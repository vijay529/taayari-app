import express from 'express';
import Quiz from '../models/Quiz.model.js'


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





router.get('/addquiz',async(req,res,next)=>{
    try {
        res.status(200).json({message:"Hello world"})
    } catch (error) {
        next(error)
    }
})

export default router;