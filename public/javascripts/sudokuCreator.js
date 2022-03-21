

var solver = require('./solver')

/* 
    this part of the code generates a random sudoku board shuffling columns within the range of 3,
    shuffling rows within the range of 3, shuffling horizontal boxes(sets of 3 columns)
    and vertiacal boxes(sets of 3 rows)

    it's all done based on the initial board which is just a random board that is valid
    (no duplicates within the column, the row and the box)

    at the beginning all the numbers are shifted by random value(if value = 3 then shifted value = initial + 3)
    for example: 6->9, 9->2, 1->4 etc.
*/



function transformNumbers(board) {
    let shift = Math.floor(Math.random() * 9) + 1
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] <= (9 - shift))
                board[row][col] += shift
            else board[row][col] -= (9 - shift)
        }
    }
    return board
}


function shuffleRows(board, midRow) {
    let iterations = Math.floor(Math.random() * 4) + 1
    for (let index = 0; index < iterations; index++) {
        if (Math.random() < 0.5) {
            let temp = board[midRow + 1]
            board[midRow + 1] = board[midRow]
            board[midRow] = temp
        }
        else {
            let temp = board[midRow - 1]
            board[midRow - 1] = board[midRow]
            board[midRow] = temp
        }
    }
    return board
}


function shuffleCols(board, midCol) {
    let iterations = Math.floor(Math.random() * 4) + 1
    for (let index = 0; index < iterations; index++) {
        var colA = Math.floor(Math.random() * 3 + midCol - 1)
        var colB = Math.floor(Math.random() * 3 + midCol - 1)
        while (colB == colA)
            colB = Math.floor(Math.random() * 3 + midCol - 1)

        for (let row = 0; row < 9; row++) {
            let temp = board[row][colA]
            board[row][colA] = board[row][colB]
            board[row][colB] = temp
        }
    }

    return board
}

function shuffle3x3rows(board) {

    let iterations = Math.floor(Math.random() * 4) + 1
    for (let index = 0; index < iterations; index++) {
        var row3x3A = Math.floor(Math.random() * 3)
        var row3x3B = Math.floor(Math.random() * 3)

        while (row3x3A == row3x3B)
            row3x3B = Math.floor(Math.random() * 3)

        for (let row = 0; row < 3; row++) {
            let temp = board[row3x3A * 3 + row]
            board[row3x3A * 3 + row] = board[row3x3B * 3 + row]
            board[row3x3B * 3 + row] = temp
        }
    }
    return board
}

function shuffle3x3cols(board) {

    let iterations = Math.floor(Math.random() * 4) + 1
    for (let index = 0; index < iterations; index++) {
        var col3x3A = Math.floor(Math.random() * 3)
        var col3x3B = Math.floor(Math.random() * 3)

        while (col3x3A == col3x3B)
            col3x3B = Math.floor(Math.random() * 3)

        for (let col = 0; col < 3; col++) {
            for (let row = 0; row < 9; row++) {
                let temp = board[col3x3A * 3 + col]
                board[col3x3A * 3 + col] = board[col3x3B * 3 + col]
                board[col3x3B * 3 + col] = temp
            }
        }
    }
    return board
}



function hideCells(newDeck) {
    let x = Math.floor(Math.random() * 9)
    let y = Math.floor(Math.random() * 9)
    var removedCells = 0

    while (removedCells < 56) {
        while (newDeck[x][y] == 0) {
            x = Math.floor(Math.random() * 9)
            y = Math.floor(Math.random() * 9)
        }
        let removedValue = newDeck[x][y]
        newDeck[x][y] = 0
        // console.log(x,y)
        // console.log(removedValue)

        if (findSolutions(newDeck, 0) == 2)
            newDeck[x][y] = removedValue
        else
            removedCells += 1
    }
    return newDeck
}

function findEmpty(board) {
    var pos = []

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if (board[row][col] == 0) {
                pos.push(row, col)

                return pos
            }

        }

    }

    return [-1, -1]
}

function isValid(board, pos, num) {
    // check if the insert number is already in a row
    for (let i = 0; i < board.length; i++) {
        if (board[pos.row][i] == num && pos.col != i)
            return false;
    }

    // check if the insert number is already in a column
    for (let i = 0; i < board.length; i++) {
        if (board[i][pos.col] == num && pos.row != i)
            return false;
    }

    // determine the current 3x3 box
    let xBox = Math.floor(pos.row / 3);
    let yBox = Math.floor(pos.col / 3);

    // check if the insert number is already in a current box
    for (let i = xBox * 3; i < (xBox * 3 + 3); i++) {
        for (let j = yBox * 3; j < (yBox * 3 + 3); j++) {
            if (board[i][j] == num && pos.row != i && pos.col != j) {
                return false;
            }
        }
    }

    return true;
}



function findSolutions(board, numSolutions) {
    let find = findEmpty(board);
    if (find[0] == -1) {
        numSolutions += 1
        if (numSolutions > 1)
            return 2
        return false;
    }

    let row = find[0]
    let col = find[1]


    for (let i = 1; i < 10; i++) {

        if (isValid(board, { row, col }, i)) {
            board[row][col] = i;
            if (findSolutions(board, numSolutions))

                return true;

        }
        board[row][col] = 0;
    }


    return false;

}

function generateUniqueDeck() {
    var initialBoard = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],

        [2, 3, 1, 5, 6, 4, 8, 9, 7],
        [5, 6, 4, 8, 9, 7, 2, 3, 1],
        [8, 9, 7, 2, 3, 1, 5, 6, 4],

        [3, 1, 2, 6, 4, 5, 9, 7, 8],
        [6, 4, 5, 9, 7, 8, 3, 1, 2],
        [9, 7, 8, 3, 1, 2, 6, 4, 5]
    ];

    let myBoard = transformNumbers(initialBoard)
    for (let index = 0; index < 3; index++) {
        myBoard = shuffle3x3cols(shuffle3x3rows(shuffleCols(shuffleRows(initialBoard, (1 + index * 3)), (1 + index * 3))))
    }
    myBoard = hideCells(myBoard)
    return myBoard
}

var deck = generateUniqueDeck()

// console.table(deck)






module.exports = deck