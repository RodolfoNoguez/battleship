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



