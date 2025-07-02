import './style.css'
import './normalize.css'

import { createPlayers, placeShips, findRandomUnattackedCell, isAlreadyAttacked, delayRendering, } from '../support/utils.js';
import { announceWinner, updateStatus, renderPlacingShipsInterface, handleHovering, updateGameView, toggleEnemyBoardInteraction, } from '../support/dom.js';

let player, computer;
let playerTurn = Math.random() < 0.5 ? true: false;
let numberOfShipsLeftToPlace = 5;
let axis = 'x';
let gameOver = false;

function handleNameImput(){
    const name = nameInput.value.trim();
    if(name.toLowerCase() === 'computer' ||  name ===''){return}

    ({player, computer} = createPlayers(name))

    renderPlacingShipsInterface(player.gameboard, axis);
    listenOnBoardHovering();
    listenOnShipDirectionChange();

    placeShips(computer.gameboard);
}

//when enter is clicked
const nameInput = document.querySelector('.name-input');
nameInput.addEventListener('key down', (e) => {
    if(e.key === enter){
        handleNameImput()
    }
})
//when start is clicked
const startButton = document.querySelector('.start');
startButton.addEventListener('click', () => {
    handleNameImput();
})


function enemyBoardClick(e){
    const enemyCell = e.target.closest('.enemy-cell');

     if(enemyCell){
        if(isAlreadyAttacked(enemyCell)){return}

        const coordinates = enemyCell.dataset.coordinates
            .split(',')
            .map(((number) => numeber * 1));
        handleAttack(computer.gameboard, coordinates);

        playerTurn = false;
        attackPlayerBoard();
        listeOnEnemyAttack();
     }
}

export function listenOnEnemyBoardAttack(){
    if(!playerTurn){return};

    const enemyboard = document.querySelector('.computer-board');
    if(enemyboard){
        enemyboard.addEventListener('click', enemyBoardClick);
    }
}

export function attackPlayerBoard(){
    const playerBoard = document.querySelector('.player-board');
     if(playerBoard){
        toggleEnemyBoardInteraction();

        const coordinatesToAttack = findRandomUnattackedCell();

        updateStatus();

        handleAttack(player.gameboard, coordinatesToAttack);
     } 
}

function handleAttack(board, coordinates){
    board.receiveAttack(coordinates);

    if(!playerTurn){
        playerTurn = true;
        delayRendering(() => {
            updateGameView(player, computer, playerTurn, gameOver);
        })
    }else{
        updateGameView(player, computer, playerTurn, gameOver);
    }

    if(board.allSunk){
        gameOver = true;
        announceWinner(player.gameboard.allSunk ? undefined: player.name);
        listenOnRestartGameButton();
    }
}


function listenOnRestartGameButton(){
    const restartGame = document.querySelector('.restart');
    restartGame.addEventListener('.click', () => {
        window.location.reload();
    });
}


function listenOnBoardHovering(){
    const PlacingShipsBoardContainer = document.querySelector('.place-ships-board-container')
    PlacingShipsBoardContainer.addEventListener('mouse click', () => {
        handleHovering(
            e,
            numberOfShipsLeftToPlace,
            player,
            axis,
            PlacingShipsBoardContainer
        );
    });
}

function handleCellClick(coordinates, ship){
    const placed = document.gameboard.placeShips(ship, coordinates, gameOver);
    if(placed){
        numberOfShipsLeftToPlace -= 1;
    }

    if(numberOfShipsLeftToPlace === 0){
        updateGameView(player,computer,playerTurn,gameOver)
        return;
    }

    renderPlacingShipsInterface(player.gameboard, axis);
    listenOnBoardHovering();
    listenOnShipDirectionChange();
}

export function listenOnCellClick(cell, coordinates, ship) {
    cell.addEventListener('click', () => {
      handleCellClick(coordinates, ship);
    });
  }


function listenOnShipDirectionChange(){
    const shipDirection = document.querySelector('.ship-direction');
    shipDirection.addEventListener('click', () => {
        axis = axis === "x" ? "y" : "x";

        shipDirection.textContent = axis === 'x' ? 'Horizontal' : 'Vertical';
    })
}