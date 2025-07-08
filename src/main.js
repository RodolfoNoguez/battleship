import './style.css';
import './normalize.css';
import {
  createUsers,
  placeShips,
  findRandomUnattackedCell,
  isAlreadyAttacked,
  delayRendering,
} from '../support/utils.js';
import {
  announceWinner,
  updateStatus,
  placingShipsInterface,
  handleHovering,
  updateGameView,
  toggleEnemyBoardInteraction,
} from '../support/dom.js';

let player, computer;
let playerTurn = Math.random() < 0.5 ? true : false;
let numberOfShipsLeftToPlace = 5;
let axis = 'x';
let gameOver = false;

function handleNameInput() {
  const name = nameInput.value.trim();
  if (name.toLowerCase() === 'computer' || name === '') return;

  ({ player, computer } = createUsers(name));

  placingShipsInterface(player.gameboard, axis);
  listenOnBoardHovering();
  listenOnShipDirectionChange();

  placeShips(computer.gameboard);
}

const nameInput = document.querySelector('.name-input');
nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleNameInput();
  }
});

const startButton = document.querySelector('.start');
startButton.addEventListener('click', () => {
  handleNameInput();
});

function handleEnemyBoardClick(e) {
  const enemyCell = e.target.closest('.enemy-cell');

  if (enemyCell) {
    if (isAlreadyAttacked(enemyCell)) return;

    const coordinates = enemyCell.dataset.coordinates
      .split(',')
      .map((number) => number * 1);

    handleAttack(computer.gameboard, coordinates);

    playerTurn = false;
    attackPlayerBoard();
    listenOnEnemyBoardAttack();
  }
}

export function listenOnEnemyBoardAttack() {
  if (!playerTurn) return;

  const enemyBoard = document.querySelector('.computer-board');
  if (enemyBoard) {
    enemyBoard.addEventListener('click', handleEnemyBoardClick);
  }
}

export function attackPlayerBoard() {
  const playerBoard = document.querySelector('.player-board');
  if (playerBoard) {
    toggleEnemyBoardInteraction();

    const coordinatesToAttack = findRandomUnattackedCell(playerBoard);

    updateStatus();

    handleAttack(player.gameboard, coordinatesToAttack);
  }
}

function handleAttack(board, coordinates) {
  board.receiveAttack(coordinates);

  if (!playerTurn) {
    playerTurn = true;
    delayRendering(() =>
      updateGameView(player, computer, playerTurn, gameOver)
    );
  } else {
    updateGameView(player, computer, playerTurn, gameOver);
  }

  if (board.allSunk) {
    gameOver = true;
    announceWinner(player.gameboard.allSunk ? undefined : player.name);
    listenOnRestartGameButton();
  }
}

function listenOnRestartGameButton() {
  const restartGame = document.querySelector('.restart');
  restartGame.addEventListener('click', () => {
    window.location.reload();
  });
}

function listenOnBoardHovering() {
  const placeShipsBoardContainer = document.querySelector(
    '.place-ships-board-container'
  );
  placeShipsBoardContainer.addEventListener('mouseover', (e) => {
    handleHovering(
      e,
      numberOfShipsLeftToPlace,
      player,
      axis,
      placeShipsBoardContainer
    );
  });
}

function handleCellClick(coordinates, ship) {
  const placed = player.gameboard.placeShip(ship, coordinates, axis);
  if (placed) {
    numberOfShipsLeftToPlace -= 1;
  }

  if (numberOfShipsLeftToPlace === 0) {
    updateGameView(player, computer, playerTurn, gameOver);
    return;
  }

  placingShipsInterface(player.gameboard, axis);
  listenOnBoardHovering();
  listenOnShipDirectionChange();
}

export function listenOnCellClick(cell, coordinates, ship) {
  cell.addEventListener('click', () => {
    handleCellClick(coordinates, ship);
  });
}

function listenOnShipDirectionChange() {
  const shipDirection = document.querySelector('.ship-direction');
  shipDirection.addEventListener('click', () => {
    axis = axis === 'x' ? 'y' : 'x';

    shipDirection.textContent = axis === 'x' ? 'Horizontal' : 'Vertical';
  });
}