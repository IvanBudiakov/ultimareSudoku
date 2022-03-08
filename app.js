var express = require('express');
var app = express();

var path = require('path');

var indexRouter = require('./routes/index');
var gameRouter = require('./routes/sudoku');
var testRouter = require('./routes/test');



app.listen(3000);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', indexRouter);

app.use(gameRouter);
app.use(testRouter);


app.use(express.static(__dirname + '/public'));

const randomArray = (length, max) => 
  Array(length).fill().map(() => Math.round(Math.random() * max))
  console.log(randomArray(60,81).sort())
module.exports = app;
