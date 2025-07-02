import express from 'express'
import cookieParser from 'cookie-parser'
import quizRoutes from './routes/quizRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/quiz',quizRoutes)
app.use('/user',userRoutes)
app.use((err,req,res,next)=>{
    const errCode = err.status||500;
    const errMessage = err.message||"Internal server error";
    res.status(errCode).json({error:errMessage})
})

export default app