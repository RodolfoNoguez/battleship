const Player  = require('./player');


function createPlayers(name){
    const player = new Player(name);
    const computer = new Player();

    return { player, computer }
}


function placeShips(gameboard){
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


