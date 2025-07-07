import express from 'express';
import Quiz from '../models/Quiz.model';
import Question from '../models/Question.model.js'
import Attempt from '../models/Attempt.model.js'
import auth from '../middleware/auth.js'
import { submitAttemptFun } from '../utils/submitAttempt.js';

const router = express.Router();

router.post('/startAttempt', auth,async(req,res,next)=>{
    try {
        const userId = req.user.id;
        const {quizId} = req.query;
        if(!userId||userId.trim()===""||!quizId||quizId.trim()===""){
            return  res.status(400).json({error:"invaild user or quiz"})
        }
        const quiz = await Quiz.findById(quizId)
        if(!quiz){
            return res.status(404).json({error:"quiz not found"})
        }
        const prevAttempt = await Attempt.findOne({userId:userId});

        const now = new Date();
        const expiresAt = new Date(now.getTime() + quiz.timeLimit*60*1000);

        const questions = await Question.find({_id:{
            $in:quiz.questionIds
        }}).lean()

        const questionsMap = new Map(questions.map((q)=>[q._id.toString(),q]));
        const orderedQuestions = quiz.questionIds.map(q=>questionsMap.get(q.toString()));
        if(orderedQuestions.includes(undefined)){
            return res.status(500).json({error:"Internal server error"})
        }
        const answers = orderedQuestions.map((q)=>{
            const correctIndex = q.correctAnswerIndex
            return {
            questionId:q._id,
            selectedIndex:undefined,
            correctIndex: correctIndex,
            duration:0
            }
        })

        if(prevAttempt){
            if(prevAttempt.status=='in-progress'){
                const currAnsIndex = prevAttempt.currentQuestionIndex;
                const currAns = prevAttempt.answers[currAnsIndex];
                currAns.startedAt = now;
                await prevAttempt.save();
                const currQuestion = orderedQuestions[currAnsIndex];
                return res.status(200).json({
                    quizId:quiz._id,
                    startedAt:prevAttempt.startedAt,
                    expiresAt:prevAttempt.expiresAt,
                    question:{
                        id:currQuestion._id,
                        title:currQuestion.title,
                        options:currQuestion.options,
                        duration:currQuestion.duration
                    }
                })
                
            }else{
                return res.status(400).json({error:"already attempted"});
            }    
        }

        const attempt = new Attempt({
            userId:userId,
            quizId:quizId,
            answers:answers,
            startedAt:now,
            expiresAt,
            currentQuestionIndex:0,
        });
        attempt.answers[attempt.currentQuestionIndex].startedAt=now;
        const firstQuestion = orderedQuestions[0]
        await attempt.save()
        res.status(201).json({
            quizId:quiz._id,
            startedAt:now,
            expiresAt,
            question:{
                id:firstQuestion._id,
                title:firstQuestion.title,
                options:firstQuestion.options,
                duration:firstQuestion.duration
            }
        })
    } catch (error) {
        next(error)
    }
})

router.post('/submitQuestion', auth, async(req,res,next)=>{
    try {
        const userId = req.user.id;
        const {quizId, questionId, selectedIndex} = req.body;
        if(!quizId||!questionId||quizId.trim()===""||questionId.trim()===""){
            return res.status(400).json({error:"Invalid request"})
        }

        const attempt = await Attempt.findOne({userId,quizId});
        if(!attempt||attempt.status!=="in-progress"){
            return res.status(400).json({error:"Invalid request"})
        }

        const currAnsIndex = attempt.answers.findIndex(q=>q.questionId.toString()===questionId);
        if(currAnsIndex==-1){
            return res.status(400).json({error:"Invalid request"})
        }

        if(currAnsIndex!==attempt.currentQuestionIndex){
            await submitAttemptFun(attempt._id);
            return res.status(400).json({error:"Mismatched question"})
        }

        const currAns = attempt.answers[currAnsIndex];
        currAns.selectedIndex=selectedIndex
        currAns.answeredAt = new Date();
        currAns.duration = (Date.now()-currAns.startedAt.getTime())/1000
        currAns.ipAddress=req.ip||""
        currAns.deviceInfo=req.headers['user-agent']||""
        attempt.currentQuestionIndex++;

        const nextQuestionId = attempt.answers[attempt.currentQuestionIndex].questionId
        if(!nextQuestionId){
            await submitAttemptFun(attempt._id);
            return res.status(201).json({message:"All questions attempted"})
        }
        const nextQuestion = await Question.findById(nextQuestionId).lean();
        attempt.answers[attempt.currentQuestionIndex].startedAt=new Date();
        await attempt.save()

        res.status(201).json({
            question:{
                id:nextQuestion._id,
                title:nextQuestion.title,
                options:nextQuestion.options,
                duration:nextQuestion.duration
            }
        })

    } catch (error) {
        next(error)
    }
})