var express = require('express');
var router = express.Router();

var solver = require('../public/javascripts/solver')
// var checker = require('../public/javascripts/checker')
var creator = require('../public/javascripts/sudokuCreator')
 
//  const myModule = require('../public/javascripts/sudokuSolver');
//  var deck = myModule.theDeck; // val is "Hello"   

router.get('/game', function(req, res, next) {
    res.render('game', { sudoku : {board : deck} });
});

console.time()
const deck = creator
console.timeEnd()


// console.table(deck)

// console.log(solver.solve(deck))
// console.table(deck)

module.exports = router;