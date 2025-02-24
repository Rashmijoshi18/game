const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const winnerText = document.getElementById('winnerText');

let isXTurn = true;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function startGame() {
    isXTurn = true;
    gameActive = true;
    winnerText.textContent = '';
    messageElement.style.display = 'none';
    cells.forEach(cell => {
        cell.classList.remove('taken', 'x', 'o');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'x' : 'o';
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass.toUpperCase();
    cell.classList.add('taken', currentClass);
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        winnerText.textContent = "It's a Draw!";
    } else {
        winnerText.textContent = `${isXTurn ? 'X' : 'O'} Wins!`;
    }
    messageElement.style.display = 'block';
}

startGame();
