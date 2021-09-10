var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

var indexRouter = require('./routes/index');
var portfolioRouter = require('./routes/portfolio');
var typeRouter = require('./routes/type');
var certificationRouter = require('./routes/certification');
var educationRouter = require('./routes/education');
var experienceRouter = require('./routes/experience');
var fileUpload = require('express-fileupload');

var database = require('./config/database');

var app = express();
app.use(fileUpload({ createParentPath: true }));

var mysql      = require('mysql');
var connection = mysql.createConnection(database);
connection.connect();

global.connection = connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3006']
}));

app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/type', typeRouter);
app.use('/api/certification', certificationRouter);
app.use('/api/education', educationRouter);
app.use('/api/experience', experienceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
