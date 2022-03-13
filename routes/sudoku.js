var express = require('express');
var router = express.Router();

var solver = require('../public/javascripts/solver')
var creator = require('../public/javascripts/sudokuCreator')
 
//  const myModule = require('../public/javascripts/sudokuSolver');
//  var deck = myModule.theDeck; // val is "Hello"   

const randomArray = (length, max) => [...new Array(81)]
.map(() => Math.round(Math.random() * 81));

var deck = creator


router.get('/game', function(req, res, next) {
res.render('game', { sudoku : {board : deck , blank : randomArray(81,81)} });
});

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

  console.log(solver.solve(sudoku))
  console.table(sudoku)


  console.table(deck)

module.exports = router;