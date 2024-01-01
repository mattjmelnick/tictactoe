function createPlayer(name, marker) {
    let boardCoords;
    const getInput = () => {
        let inputCoords = prompt("Enter coordinates:");
        boardCoords = inputCoords.split(" ");
        return boardCoords;
    };
    return { name, marker, getInput};
}

let player1 = createPlayer('player1', 'x');
let player2 = createPlayer('player2', 'o');

const board = (function () {
    let gameBoard = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
    const clearBoard = () => gameBoard = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
    const displayBoard = () => {console.log(gameBoard[0]); console.log(gameBoard[1]); console.log(gameBoard[2])};
    const updateCoordinates = (coords, marker) => {gameBoard[coords[0]][coords[1]] = marker};
    return { gameBoard, clearBoard, displayBoard, updateCoordinates };
})();

const game = (function () {
    let gameWonCheck = true;
    const checkForWin = (gameBoard) => {
        // logic for looping through gameboard array
        let xCounter = 0;
        let oCounter = 0;
        let gamePlaying = true;
        // Check rows
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                if (gameBoard[i][j] === 'x') {
                    xCounter++;
                }
                else if (gameBoard[i][j] === 'o') {
                    oCounter++;
                }
            }
            if (xCounter === 3) {
                console.log("Player 1 wins");
                gamePlaying = false;
                return gameWon;
            }
            else if (oCounter === 3) {
                console.log("Player 2 wins");
                gamePlaying = false;
                return gameWon;
            }
            else {
                xCounter = 0;
                oCounter = 0;
            }
        }
        // Check columns
        // add code
        return gamePlaying;
    };
    const playRound = () => {
        while (gameWonCheck) {
            console.log(gameWonCheck);
            let player1Coords = player1.getInput();
            board.updateCoordinates(player1Coords, player1.marker);
            board.displayBoard();
            gameWonCheck = checkForWin(board.gameBoard);
            let player2Coords = player2.getInput();
            board.updateCoordinates(player2Coords, player2.marker);
            board.displayBoard();
            gameWonCheck = checkForWin(board.gameBoard);
        }
    }
    return { playRound, checkForWin };
})();