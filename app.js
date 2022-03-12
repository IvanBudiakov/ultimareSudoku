const { Template } = require('ejs');
var express = require('express');
var app = express();

var path = require('path');

var indexRouter = require('./routes/index');
// var gameRouter = require('./routes/sudoku');
var testRouter = require('./routes/test');



app.listen(3000);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', indexRouter);

// app.use(gameRouter);
app.use(testRouter);


app.use(express.static(__dirname + '/public'));




function findEmpty(board){
    var pos = []

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if(board[row][col]==0)
            {
                pos.push(row,col)
                
                return pos
            }
            
        }
        
    }

    return [-1,-1]
}

function isValid(board, pos, num){
    // check if the insert number is already in a row
	for (let i = 0; i < board.length; i++)
	{
        if (board[pos.row][i] == num && pos.col != i)
            return false;
	}

	// check if the insert number is already in a column
	for (let i = 0; i < board.length; i++)
	{
		if (board[i][pos.col] == num && pos.row != i)
			return false;
	}

	// determine the current 3x3 box
	let xBox = Math.floor(pos.row / 3);
	let yBox = Math.floor(pos.col / 3);

	// check if the insert number is already in a current box
	for (let i = xBox * 3; i < (xBox * 3 + 3); i++)
	{
		for (let j = yBox * 3; j < (yBox * 3 + 3); j++)
		{
			if (board[i][j] == num && pos.row != i && pos.col != j){
                return false;}
		}
	}

	return true;
}

function backTrackSolve(board)
{
	let find = findEmpty(board);
	if (find[0] == -1)
		return true;

	let row = find[0]
    let col = find[1]


	for (let i = 1; i < 10; i++)
	{

        if (isValid(board, { row,col }, i))
		{
			board[row][col] = i;
			if (backTrackSolve(board))
				return true;

			board[row][col] = 0;
		}
	}

	return false;

}

var sudoku = [
    [1,0,7, 3,0,0, 0,0,0],
    [0,0,3, 4,0,6, 8,0,0],
    [0,9,6, 2,0,5, 0,0,4],

    [0,5,8, 7,0,0, 0,0,9],
    [0,6,0, 0,5,0, 0,8,0],
    [3,0,0, 0,0,2, 6,5,0],

    [9,0,0, 5,0,4, 3,7,0],
    [0,0,2, 6,0,7, 9,0,0],
    [0,0,0, 0,0,1, 4,0,8]
]

backTrackSolve(sudoku)

console.table(sudoku)




module.exports = app;
