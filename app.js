var express = require('express');
var app = express();

var path = require('path');

var indexRouter = require('./routes/index');
var gameRouter = require('./routes/sudoku');


app.listen(3000);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', indexRouter);

app.use(gameRouter)


app.use(express.static(__dirname + '/public'));

module.exports = app;
