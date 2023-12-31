function createPlayer(name, marker) {
    let boardCoords;
    const getInput = () => {
        let inputCoords = prompt("Enter coordinates:");
        boardCoords = inputCoords.split(" ");
        return boardCoords;
    }
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
    const checkForWin = (gameBoard) => {
        // logic for looping through gameboard array
        return true;
    }
    const playRound = () => {
        let gameWon = checkForWin(board.gameBoard);
        while (!gameWon) {
            let player1Coords = player1.getInput();
            board.updateCoordinates(player1Coords, player1.marker);
            board.displayBoard();
            checkForWin(board.gameBoard);
            let player2Coords = player2.getInput();
            board.updateCoordinates(player2Coords, player2.marker);
            board.displayBoard();
            checkForWin(board.gameBoard);
        }
    }
    return { playRound };
})();