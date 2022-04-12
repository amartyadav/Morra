import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
const app = express()


var logger = require('morgan');

// importing routes

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import authRouter from './routes/auth'
import eventsRouter from './routes/events'

// parse body params and attache them to req.body app.use(bodyParser.json()) app.use(bodyParser.urlencoded({ extended: true })) app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing app.use(cors())
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', authRouter);
app.use('/', eventsRouter);
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({"error" : err.name + ": " + err.message})
    }
    else if(err){
        res.status(400).json({"error" : err.name + ": " + err.message})
    }
})


export default app;