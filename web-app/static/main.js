import Ajax from "./ajax.js";

// Gets the solve button
const solve_button = document.getElementById("solve-button");
const clear_button = document.getElementById("clear-button");
// Gets the popup for the solved sudoku
const modal = document.getElementById("myModal");

// When the user wants the csolved sudoku
solve_button.onclick = function () {

    // Forms the entered sudoku into a matrix for serverside manipulation
    let unsolvedSudoku = [];
    for(let i = 1; i < 10; i++){
        let currentRow = []
        for (var j = 1; j < 10; j++){
            // accesses all of the IDs for the forms
            let id  = i.toString().concat("-",j.toString())
            // appends them to the list
            currentRow.push(document.getElementById(id).value)
        }
        unsolvedSudoku.push(currentRow)
    }

    // Forms the query to send to the server
    Ajax.query({
        // sends the unsolved sudoku
        "type": "solve",
        "sudoku": unsolvedSudoku
    }).then(function (response_object){
        // extracts the 2d matrix
        solvedBoard = response_object.sudoku
        // if the board has been solved
        if (solvedBoard != false){
            // Show the board
            document.getElementById("solvedBoard").style.display = "";
            // Delete the sub text
            document.getElementById("ansSub").textContent = "";
            // Show the title that it has solved it
            document.getElementById("answer").textContent = "Solved the Suduku"


            // Iterates over the matrix
            for (var i = 1; i < 10; i++){
                for (var j = 1; j < 10; j++){
                    // Note: the -1 on the co-ordinates at the origin in 0,0 in
                    // the matrix
                    // but 1,1 in the html
                    let value = solvedBoard[i-1][j-1]
                    let letter = "c"
                    let id  = letter.concat(i.toString(),"-",j.toString())
                    document.getElementById(id).textContent = value
                }
            }
        }else{
            // if solving it has been unsucessful chnage the title
            document.getElementById("answer").textContent = "Invalid Board - Unable to Solve"
            // hide the sdoku board
            document.getElementById("solvedBoard").style.display = "none";
            document.getElementById("ansSub").textContent = "Check for repeated values in the rows and columns and boxes. Also check for letters and negative numbers"
        }
    })

    modal.style.display = "block";
};

clear_button.onclick = function () {
    for(let i = 1; i < 10; i++){
        for (var j = 1; j < 10; j++){
            // accesses all of the IDs for the forms
            let id  = i.toString().concat("-",j.toString())
            // appends them to the list
            document.getElementById(id).value = ""
        }
    }
};