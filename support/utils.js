import GameBoard from './gameBoard.js'; 
import Player from './player.js'


export function createPlayers(name){
    const player = new Player(name);
    const computer = new Player();

    return { player, computer }
}


export function placeShips(gameboard){
    placeShip(gameboard, gameboard.carrier);
    placeShip(gameboard, gameboard.battleship);
    placeShip(gameboard, gameboard.cruiser);
    placeShip(gameboard, gameboard.submarine);
    placeShip(gameboard, gameboard.destroyer);
}


function placeShip(board, ship) {
    let axis = Math.random() < 0.5 ? 'x' : 'y';
    let { i, j } = generateRandomCoordinates();
  
    while (!board.canPlaceShip(ship, [i, j], axis)) {
      ({ i, j } = generateRandomCoordinates());
      axis = Math.random() < 0.5 ? 'x' : 'y';
    }
  
    board.placeShip(ship, [i, j], axis); 
  }
  

function generateRandomCoordinates(){
    return {
        i: Math.floor(Math.random() * (9 - 0 + 1) + 0),
        j: Math.floor(Math.random() * (9 - 0 + 1) + 0),
      };
}

export function isAlreadyAttacked(cell){
    return cell.classList.contains('miss') || cell.classList.contains('hit')
}


export function findRandomUnattackedCell(playerboard){
    let { i,j } = generateRandomCordinates();
    
    const cell = playerboard.querySelectot(`[data-coordinate='${i},${j}']`);
    let alreadyAttacked = isAlreadyAttacked();
    
    while(alreadyAttacked){
        ({ i, j } = generateRandomCordinates());

        const cell = playerboard.querySelectot(`[data-coordinate='${i},${j}']`);
        let alreadyAttacked = isAlreadyAttacked();
    }
     return [i, j];
}   

export function delayRendering(callback){
    setTimeout(callback, 1000);

}


