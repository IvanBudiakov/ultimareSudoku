var express = require('express');
var router = express.Router();

function transformNumbers(board){
  let shift = Math.floor(Math.random()*9)+1
  for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
          if(board[row][col] <= (9 - shift))
              board[row][col] += shift
          else board[row][col] -= (9-shift)  
      }
  }    
  return board
}


function shuffleRows(board, midRow){
  let iterations = Math.floor(Math.random()*4)+1
  for (let index = 0; index < iterations; index++) {
      if(Math.random() < 0.5){
          let temp = board[midRow+1]
          board[midRow+1] = board[midRow]
          board[midRow] = temp
      }
      else{
          let temp = board[midRow-1]
          board[midRow-1] = board[midRow]
          board[midRow] = temp
      }            
  }    
  return board
}


function shuffleCols(board, midCol){
  let iterations = Math.floor(Math.random()*4)+1
  for (let index = 0; index < iterations; index++) {
      var colA = Math.floor(Math.random()*3 + midCol-1)
      var colB = Math.floor(Math.random()*3 + midCol-1)
      while(colB==colA)
          colB = Math.floor(Math.random()*3 + midCol-1)
      
      for (let row = 0; row < 9; row++) {
              let temp = board[row][colA]
              board[row][colA] = board[row][colB]
              board[row][colB] = temp   
          }
  }
  
  return board
}

function shuffle3x3rows(board){
      
  let iterations = Math.floor(Math.random()*4)+1
  for (let index = 0; index < iterations; index++) {
      var row3x3A = Math.floor(Math.random()*3)
      var row3x3B = Math.floor(Math.random()*3)
      
      while(row3x3A==row3x3B)
          row3x3B = Math.floor(Math.random()*3)

      for (let row = 0; row < 3; row++) {
          let temp = board[row3x3A*3+row]
          board[row3x3A*3+row] = board[row3x3B*3+row]     
          board[row3x3B*3+row] = temp
      } 
  }    
  return board
}

function shuffle3x3cols(board){
      
  let iterations = Math.floor(Math.random()*4)+1
  for (let index = 0; index < iterations; index++) {
      var col3x3A = Math.floor(Math.random()*3)
      var col3x3B = Math.floor(Math.random()*3)
      
      while(col3x3A==col3x3B)
          col3x3B = Math.floor(Math.random()*3)

      for (let col = 0; col < 3; col++) {
          for (let row = 0; row < 9; row++) {                
              let temp = board[col3x3A*3+col]
              board[col3x3A*3+col] = board[col3x3B*3+col]     
              board[col3x3B*3+col] = temp
      }
      } 
  }    
  return board
}

function generateUniqueDeck(){  
  var initialBoard =   [
      [1,2,3,  4,5,6,  7,8,9],
      [4,5,6,  7,8,9,  1,2,3],
      [7,8,9,  1,2,3,  4,5,6],
      
      [2,3,1,  5,6,4,  8,9,7],
      [5,6,4,  8,9,7,  2,3,1],
      [8,9,7,  2,3,1,  5,6,4],
      
      [3,1,2,  6,4,5,  9,7,8],
      [6,4,5,  9,7,8,  3,1,2],
      [9,7,8,  3,1,2,  6,4,5]
  ]; 
   
  let myBoard = transformNumbers(initialBoard)
  for (let index = 0; index < 3; index++) {
      myBoard = shuffle3x3cols(shuffle3x3rows(shuffleCols(shuffleRows(initialBoard, (1+index*3)),(1+index*3))))
  }
  return myBoard
}


const deck = generateUniqueDeck()

console.table(deck)

const randomArray = (length, max) => [...new Array(81)]
    .map(() => Math.round(Math.random() * 81));


router.get('/game', function(req, res, next) {
    res.render('game', { sudoku : {board : deck , blank : randomArray(81,81)} });
  });


/*
    next part of the code generates a sudoku solver which is used to generate sudoku boards
    and to visualize the backtracking algoritm
*/




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

// console.table(sudoku)


module.exports = router;