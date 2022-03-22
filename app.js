// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').parse
// }

const { Template } = require('ejs');
var express = require('express');
var app = express();

var path = require('path');

var indexRouter = require('./routes/index');
var gameRouter = require('./routes/sudoku');
var testRouter = require('./routes/test');


const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL)
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', error => console.log('connected to mongoose'))

app.listen(process.env.PORT || 3000);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
 
app.use(gameRouter);
app.use(testRouter);


app.use(express.static(__dirname + '/public'));


module.exports = app