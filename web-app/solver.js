const solver = Object.create(null);
// Used b instead of 0 to siginify empty value as filtering to see empty spots
//  was easier and the color blue made it more visually easier to spot

// EXAMPLE BOARDS for unit testing
const b = null;

// presolved sudoku
let bd1 = [ [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 5, 6, 7, 8, 9]];

// solveable sudoku
let bd2 = [ [1, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b],
            [b, b, b, b, b, b, b, b, b]];

// more complex solveable sudoku
let bd3 = [ [b, b, b, b, b, 8, 9, 1, b],
            [b, b, 1, b, b, b, b, b, 3],
            [9, b, b, b, 2, 7, b, b, 5],
            [3, b, 2, 5, 6, b, b, b, b],
            [5, b, b, b, b, b, b, b, 8],
            [b, b, b, b, 8, 3, 5, b, 4],
            [8, b, b, 7, 4, b, b, b, 2],
            [6, b, b, b, b, b, 1, b, b],
            [b, 5, 7, 3, b, b, b, b, b]];

// impossible sudoku
let bd4 = [ [1, 2, 3, 4, 5, 6, 7, 8, b],
            [b, b, b, b, b, b, b, b, 2],
            [b, b, b, b, b, b, b, b, 3],
            [b, b, b, b, b, b, b, b, 4],
            [b, b, b, b, b, b, b, b, 5],
            [b, b, b, b, b, b, b, b, 6],
            [b, b, b, b, b, b, b, b, 7],
            [b, b, b, b, b, b, b, b, 8],
            [b, b, b, b, b, b, b, b, 9]];

// sudoku in its raw form from the front end app
let bd5 = [["1", "4", "5", "9", "2", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "1", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", ""]];



solver.solve = function(board){
    // solves the given sudoku board

    // converts the raw inputed board into ints so it can be worked with easily
    // chnages board by reference
    solver.validRawBoard(board);
    // console.log(solver.solved(board))
    if (solver.solved(board)) {
        // if the board is solved return it as it is
        return board;
    }
    else {
        // finds the first emply square and generates 9 different
        // boards filling in that square with numbers 1...9
        const possibilities = solver.nextBoards(board);
        // filters out all of the invalid boards from the list
        const validBoards = solver.keepOnlyValid(possibilities);

        return solver.searchForSolution(validBoards);
    }
};


solver.searchForSolution = function(boards){
    // finds a valid solution to the sudoku problem
    if (boards.length < 1){
        return false;
    }
    else {
        // backtracking search for solution
        let first = boards.shift();
        const tryPath = solver.solve(first);
        if (tryPath != false){
            return tryPath;
        }
        else{
            return solver.searchForSolution(boards);
        }
    }
};


solver.emptyChecker = function(accumulator, value){
    if(accumulator === false || (value === null|| Number.isNaN(value))){
      return false;
    }else{
      return true;
    }
};

solver.solved = function(board){
// checks to see if the given puzzle is solved

    let flag = board.map(row => {
        return row.reduce(solver.emptyChecker)
    })
    if(flag.includes(false)){
        return false;
    }else{
        return true;
    }
};

solver.nextBoards = function(board){
    // finds the first emply square and generates 9 different boards filling in
    // that square with numbers 1...9
    var res = []
    const firstEmpty = solver.findEmptySquare(board)
    if (firstEmpty != undefined){
        const y = firstEmpty[0]
        const x = firstEmpty[1]
        for (var i = 1; i <= 9; i++){
            var newBoard = [...board]
            var row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res
}

solver.findEmptySquare = function(board){
    // (get the i j coordinates for the first empty square)
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null) {
                return [i, j]
            }
        }
    }
}

solver.keepOnlyValid = function(boards){
    // filters out all of the invalid boards from the list

    var res = boards.map(board => {
            if (solver.validBoard(board)){
                return board
            }else{
                return false
            }
    });
    res = res.filter(board => board != false)
    return res
}

solver.validBoard = function(board){
    // checks to see if given board is valid
    // all have to be true for board to be valid
    return solver.rowsGood(board) &&
        solver.columnsGood(board) &&
        solver.boxesGood(board)
}

solver.findDuplicates = function(row){
    var filtered = row.filter(function (el) {
        return el != null;
      });

    let duplicates = [...new Set(filtered.sort().filter((o, i) => o !== undefined && filtered[i + 1] !== undefined && o === filtered[i + 1]))]

    if(duplicates.length != 0){
        return false
    }else{
        return true
    }
}

solver.rowsGood = function(board){
    // makes sure there are no repeating numbers for each row

    // iterates through the rows
    let convertedBoard = board.map(row => solver.findDuplicates(row));
    if(convertedBoard.includes(false)){
        return false
    }else{
        return true
    }

}

solver.transpose = (array) => array[0].map(
    (ignore, colIndex) => array.map((row) => row[colIndex])
);

solver.columnsGood = function(board){
    // makes sure there are no repeating numbers for each column

    // transposes the grid then does a check row
    return solver.rowsGood(solver.transpose(board))
}


solver.boxesGood = function(board){
    // transform this everywhere to update res
    const boxCoordinates = [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]]
    // makes sure there are no repeating numbers for each box
    for (var y = 0; y < 9; y += 3){
        for (var x = 0; x < 9; x += 3){
            // examines each box for repeating values
            var cur = []
            for (var i = 0; i < 9; i++){
                var coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if (cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false
                }
                else if (board[coordinates[0]][coordinates[1]] != null){
                    cur.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true
}

solver.validRawBoard = function(board){
    // iterates over the rows

    for (var i = 0; i < 9; i++){
        // iterates over the columns
        for (var j = 0; j < 9; j++){
        // if the input box is empt
          if (board[i][j] != ""){
            // convert all filled input boxes to an int
            if (typeof board[i][j] === "string") {
                board[i][j] = parseInt(board[i][j])
            }
            // letters when converted to int return Nan
            // checks no letters were inputed and numbers are all bigger then 0
            if (Number.isNaN(board[i][j]) || board[i][j] < 1){
                return false
            }
          }else{
            // if nothing was inputed change it to store None
            board[i][j] = b
          }
        }
    }
    return board
};

// console.log(bd2)
// console.log(validRawBoard(bd5));
console.log(solver.solve(bd5))
export default Object.freeze(solver);

