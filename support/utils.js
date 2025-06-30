const Player  = require('./player');


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


function placeShip(gameboard, ship){
    let { i, j } = generateRandomCordinates();
    let axis = Math.random() < .5 ? 'x': 'y';
    

    while(!GameBoard.canPlaceShip(ship, [i,j], axis)){
        ({ i,j }) = generateRandomCordinates();
        axis = Math.random() < .5 ? 'x': 'y';
    }

    gameboard.placeShip(ship, [i, j], axis);
}

function generateRandomCordinates(){
    return {
        i: Math.floor(Math.random() * (9 - 0 + 1) + 0),
        j: Math.floor(Math.random() * (9 - 0 + 1) + 0),
      };
}

export function isAlreadyAttacked(cell){
    return cell.classList.contains('miss') || cell.classList.contains('hit')
}


export function findUnattackedCell(playerboard){
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


