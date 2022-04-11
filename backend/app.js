var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var conferenceRouter = require('./routes/conference');
var eventsRouter = require('./routes/events');
var competitionsRouter = require('./routes/competitions');
var fundraisingRouter = require('./routes/fundraising');
var rafflesRouter = require('./routes/raffles');
var shopRouter = require('./routes/shop');



var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', authRouter);
app.use('/conference', conferenceRouter);
app.use('/events', eventsRouter);
app.use('/competitions', competitionsRouter);
app.use('/fundraising', fundraisingRouter);
app.use('/raffles', rafflesRouter);
app.use('/shop', shopRouter);


module.exports = app;
