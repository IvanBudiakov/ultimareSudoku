var express = require('express');
var router = express.Router();

const board =   [
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
  
const randomArray = (length, max) => [...new Array(81)]
    .map(() => Math.round(Math.random() * 81));



router.get('/game', function(req, res, next) {
    res.render('game', { sudoku : {board : board , blank : randomArray(81,81)} });
  });



module.exports = router;