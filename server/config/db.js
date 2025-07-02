import mongoose from 'mongoose'
import { DB_CON } from './env.js';

const mainDb = mongoose.createConnection(DB_CON);

mainDb.on('connected',()=>{
    console.log('db connected')
})

mainDb.on('error', ()=>{
    console.log("something went wrong")
})

export {mainDb};