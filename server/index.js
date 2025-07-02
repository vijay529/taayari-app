import http from 'http';
import app from './app.js'
import { HOST, PORT } from './config/env.js';

const server = http.createServer(app)


server.listen(PORT,HOST,(req, res)=>{
    console.log('server started at', `http://${HOST}:${PORT}`)
})

