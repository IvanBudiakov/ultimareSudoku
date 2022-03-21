
var board = []

var userDeck = loadUserDeck()

function loadUserDeck() {
    var userDeck = []
    for (let index = 1; index <= 81; index++) {
        if (document.getElementById('cell-' + index).value != '')
            userDeck.push(document.getElementById('cell-' + index).value.slice(-1))
        else
            userDeck.push('0')
    }
    // console.log(userDeck)
    return userDeck
}


function checker(value, id) {
    value %= 10
    let cellid = parseInt(id.slice(5))

    checkValid(loadUserDeck(), cellid, value)

}

function checkValid(deck, cellid, num) {

    let cellRow = Math.floor((cellid - 1) / 9)
    let cellCol = cellid - 1 - cellRow * 9
    var pos = {
        row: cellRow,
        col: cellCol
    }
    var duplicate = 0
    var selected = document.getElementById('cell-'.concat(cellid))

        for (var col = 0; col < 9; col++) {
            let current = document.getElementById('cell-'.concat((pos.row * 9 + col + 1)))

            // if(current.value != num && current.style.color == 'red'){continue}
                if (current.value == num && pos.col != col) {
                    console.log(pos.row, col)
                    current.style.color = 'red'
                    selected.style.color = 'red'
                    selected.addEventListener("focusout", () => {
                        selected.style.color = 'red'
                        current.style.color = 'red'
                    });
                    duplicate += 1
                }
                else {
                        console.log(`didn't find any matches`)
                    selected.style.color = '#e0daa9'
                    current.style.color = '#e0daa9'
                    selected.addEventListener("focusout", () => {
                        selected.style.color = '#e0daa9'
                        current.style.color = '#e0daa9'
                    });
                }
        }

        for (var row = 0; row < 9; row++) {
            let current = document.getElementById('cell-'.concat((row * 9 + pos.col + 1)))

            if (current.value == num && pos.row != row) {
                console.log(row, pos.col)
                current.style.color = 'red'
                selected.style.color = 'red'
                selected.addEventListener("focusout", () => {
                    selected.style.color = 'red'
                    current.style.color = 'red'
                });
                duplicate += 1
            }
            else {
                    selected.style.color = '#e0daa9'
                    current.style.color = '#e0daa9'
                    selected.addEventListener("focusout", () => {
                        selected.style.color = '#e0daa9'
                        current.style.color = '#e0daa9'
                    });
                
            }
        }
        if(duplicate != 0){
            selected.style.color = 'red'
            selected.addEventListener("focusout", () => {
                selected.style.color = 'red'
            });
        }
    }



function game(solvedDeck) {
    var userDeck = loadUserDeck()
    //     let deck = solve(loadUserDeck())
    //         console.log(deck)
    //         console.log(userDeck)
    return solvedDeck == userDeck
}


// function findEmpty(board){
//     var pos = []

//     for (let row = 0; row < 9; row++) {
//         for (let col = 0; col < 9; col++) {
//             if(board[row][col]=='0')
//             {
//                 pos.push(row,col)

//                 return pos
//             }

//         }

//     }

//     return [-1,-1]
// }

// function isValid(board, pos, num){
//     // check if the insert number is already in a row
//     for (let i = 0; i < board.length; i++)
//     {
//         if (board[pos.row*9 + i + 1] == num && pos.col != i)
//             return false;
//     }

//     // check if the insert number is already in a column
//     for (let i = 0; i < board.length; i++)
//     {
//         if (board[i*9 + pos.col + 1] == num && pos.row != i)
//             return false;
//     }

//     // determine the current 3x3 box
//     let xBox = Math.floor(pos.row / 3);
//     let yBox = Math.floor(pos.col / 3);

//     // check if the insert number is already in a current box
//     for (let i = xBox * 3; i < (xBox * 3 + 3); i++)
//     {
//         for (let j = yBox * 3; j < (yBox * 3 + 3); j++)
//         {
//             if (board[i*9 + 1 + j] == num && pos.row != i && pos.col != j){
//                 return false;}
//         }
//     }

//     return true;
// }

// function solve(deck)
// {
//     let find = findEmpty(deck);
//     console.log(deck)
//     if (find[0] == -1)
//         return true;

//     let row = find[0]
//     let col = find[1]


//     for (let i = 1; i < 10; i++)
//     {
//         if (isValid(deck, { row,col }, i))
//         {
//             deck[row][col] = i;
//             if (solve(deck))

//               return true;

//           }
//             deck[row][col] = 0;
//     }


//     return false;

// }
// function animateSolved(userDeck) {
//     //   for (let index = 1; index < 82; index++) {
//     let index = 1
//     document.getElementById('cell-' + index).style.background = 'white'






window.onbeforeunload = function () {
    return 'All the data is going to be lost, are you sure?';
}
$("input").on('input', function () {
    var value = $(this).val();
    $(this).val(value[value.length - 1]);
})