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
  
  var numSolutions = 0;

  module.exports.solve = function backTrackSolve(board)
  {

      let find = findEmpty(board);
      if (find[0] == -1){
          addSolution()
          return false;
      }
      
      let row = find[0]
      let col = find[1]
  
  
      for (let i = 1; i < 10; i++)
      {
  
          if (isValid(board, { row,col }, i))
          {
              board[row][col] = i;
              if (backTrackSolve(board))
                    
                return true;
  
            }
              board[row][col] = 0;
      }
  
      return false;
  
  }

  numSolutions = 0
  function addSolution(){numSolutions+=1}
  module.exports.getNumSolutions = function getNumSolutions(){return numSolutions}


//   const deck = backTrackSolve(sudoku)
  
    
  // console.table(sudoku)
  
  /*
      this part of the code is a masking algorithm which is used to determine which values to show to a 
      user to not create a sudoku board with more than 1 possible soulution 
  
      masking algoritms is done by removing one value at a time and using the solving algorithm to
      determine whether or not this value can be hidden to not create any extra solutions 
  */
  
  
  
  // function hideCells(){
  //     const hiddenPositions = new Set()
  //     var rounds = 3
  //     while(rounds > 0 && hiddenPositions.size < 25){
  //         hiddenPositions.add()
  //     }
  // }
  