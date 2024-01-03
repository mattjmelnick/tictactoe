function createPlayer(name, marker) {
    return { name, marker };
};



let player1 = createPlayer('player1', 'X');
let player2 = createPlayer('player2', 'O');



const board = (function () {
    let gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];
    const clearBoard = () => gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];
    const displayBoard = () => { console.log(gameBoard[0]); console.log(gameBoard[1]); console.log(gameBoard[2]) };
    let gameBoardDisplay = document.querySelector(".board-display");
    let textArea = document.querySelector(".text-area");
    let gameBoardHeightWidth = (236 / 3);
    const newBoardSetup = () => {
        while (gameBoardDisplay.hasChildNodes()) {
            gameBoardDisplay.removeChild(gameBoardDisplay.firstChild);
        }
        textArea.textContent = "Player 1's turn";
        for (let i = 0; i < gameBoard.length; i++) {
            let row = document.createElement("div");
            row.style.display = "flex";
            row.style.flexWrap = "wrap";
            for (let j = 0; j < gameBoard[i].length; j++) {
                let boardSquare = document.createElement("button");
                boardSquare.classList.toggle("board-square");
                boardSquare.style.height = `${gameBoardHeightWidth}px`;
                boardSquare.style.width = `${gameBoardHeightWidth}px`;
                boardSquare.style.border = "1px solid lightgray";
                boardSquare.style.backgroundColor = "white";
                boardSquare.style.boxSizing = "border-box";
                boardSquare.style.fontSize = "50px"
                boardSquare.textContent = gameBoard[i][j];
                row.appendChild(boardSquare);
            }
            gameBoardDisplay.appendChild(row);
        }
    };
    const clickSquare = (marker) => {
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                let boardSquares = Array.from(document.querySelectorAll(".board-square"));
                boardSquares.forEach((button, idx) => {
                    button.addEventListener("click", function playGame() { 
                        let gameWonCheck = game.checkForWin(gameBoard); 
                        if (idx === i * gameBoard.length + j && button.textContent === '') {
                            button.textContent = marker;
                            gameBoard[i][j] = marker;
                            if (gameWonCheck) {
                                marker = marker === 'X' ? 'O' : 'X';
                                textArea.textContent = textArea.textContent === "Player 1's turn" ? "Player 2's turn" : "Player 1's turn";
                            }
                            else {
                                button.textContent = "";
                            }     
                        }  
                    })
                });
            }
        }
    };
    return { gameBoard, textArea, clearBoard, displayBoard, newBoardSetup, clickSquare };
})();

const game = (function () {
    // To Do:
    // - Create new game button after game ends
    const checkForWin = (gameBoard) => {
        // Logic for looping through gameboard array
        let xCounter = 0;
        let oCounter = 0;
        let gamePlaying = true;
        // Check rows
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                if (gameBoard[i][j] === 'X') {
                    xCounter++;
                }
                else if (gameBoard[i][j] === 'O') {
                    oCounter++;
                }
            }
            if (xCounter === 3) {
                board.textArea.textContent = "Player 1 wins";
                gamePlaying = false;
                return gamePlaying;
            }
            else if (oCounter === 3) {
                board.textArea.textContent = "Player 2 wins";
                gamePlaying = false;
                return gamePlaying;
            }
            else {
                xCounter = 0;
                oCounter = 0;
            }
        }
        // Check columns
        for (let j = 0; j < gameBoard[0].length; j++) {
            for (let i = 0; i < gameBoard.length; i++) {
                if (gameBoard[i][j] === 'X') {
                    xCounter++;
                }
                else if (gameBoard[i][j] === 'O') {
                    oCounter++;
                }
            }
            if (xCounter === 3) {
                board.textArea.textContent = "Player 1 wins";
                gamePlaying = false;
                return gamePlaying;
            }
            else if (oCounter === 3) {
                board.textArea.textContent = "Player 2 wins";
                gamePlaying = false;
                return gamePlaying;
            }
            else {
                xCounter = 0;
                oCounter = 0;
            }
        }
        // Check diagonals
        if (gameBoard[0][0] === 'X' && gameBoard[1][1] === 'X' && gameBoard[2][2] === 'X' || gameBoard[0][2] === 'X' && gameBoard[1][1] === 'X' && gameBoard[2][0] === 'X') {
            board.textArea.textContent = "Player 1 wins";
            gamePlaying = false;
            return gamePlaying;
        }
        else if (gameBoard[0][0] === 'O' && gameBoard[1][1] === 'O' && gameBoard[2][2] === 'O' || gameBoard[0][2] === 'O' && gameBoard[1][1] === 'O' && gameBoard[2][0] === 'O') {
            board.textArea.textContent = "Player 2 wins";
            gamePlaying = false;
            return gamePlaying;
        }
        // Check draw
        let drawCheck = 0;
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                if (gameBoard[i][j] !== '') {
                    drawCheck++;
                }
                if (drawCheck === 9) {
                    board.textArea.textContent = "Draw";
                    gamePlaying = false;
                    return gamePlaying;
                }
            }
        }
        return gamePlaying;
    };
    const playRound = () => {
        board.newBoardSetup();
        board.clickSquare('X');
    }
    return { playRound, checkForWin };
})();

game.playRound();