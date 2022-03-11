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



module.exports = router;