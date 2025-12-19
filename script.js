let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let mode = "player";

function setMode(selectedMode) {
    mode = selectedMode;
    resetGame();
    document.getElementById("status").innerText = "Game started! Player X turn";
}

function play(index) {
    if (board[index] !== "" || gameOver) return;

    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;

    if (checkWinner()) {
        document.getElementById("status").innerText = currentPlayer + " Wins!";
        gameOver = true;
        return;
    }

    if (!board.includes("")) {
        document.getElementById("status").innerText = "It's a Draw!";
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").innerText = "Player " + currentPlayer + "'s Turn";

    if (mode === "computer" && currentPlayer === "O") {
        computerMove();
    }
}

function computerMove() {
    let emptyCells = board
        .map((value, index) => value === "" ? index : null)
        .filter(index => index !== null);

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    setTimeout(() => {
        play(randomIndex);
    }, 500);
}

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;

    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    }
}
