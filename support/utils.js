import Player from './player';

export function createUsers(name) {
    const player = new Player(name);
    const computer = new Player();
  
    return { player, computer };
  }
  
  export function placeShips(gameboard) {
    placeShip(gameboard, gameboard.carrier);
    placeShip(gameboard, gameboard.battleship);
    placeShip(gameboard, gameboard.cruiser);
    placeShip(gameboard, gameboard.submarine);
    placeShip(gameboard, gameboard.destroyer);
  }
  
  function placeShip(gameboard, ship) {
    let { i, j } = generateRandomCoordinates();
    let axis = Math.random() < 0.5 ? 'x' : 'y';
  
    while (!gameboard.canPlaceShip(ship, [i, j], axis)) {
      ({ i, j } = generateRandomCoordinates());
      axis = Math.random() < 0.5 ? 'x' : 'y';
    }
  
    gameboard.placeShip(ship, [i, j], axis);
  }
  
  function generateRandomCoordinates() {
    return {
      i: Math.floor(Math.random() * (9 - 0 + 1) + 0),
      j: Math.floor(Math.random() * (9 - 0 + 1) + 0),
    };
  }
  
  export function isAlreadyAttacked(cell) {
    return cell.classList.contains('missed') || cell.classList.contains('hit');
  }
  
  export function findRandomUnattackedCell(playerBoard) {
    let { i, j } = generateRandomCoordinates();
  
    const cell = playerBoard.querySelector(`[data-coordinates='${i},${j}']`);
    let alreadyAttacked = isAlreadyAttacked(cell);
  
    while (alreadyAttacked) {
      ({ i, j } = generateRandomCoordinates());
  
      const cell = playerBoard.querySelector(`[data-coordinates='${i},${j}']`);
      alreadyAttacked = isAlreadyAttacked(cell);
    }
  
    return [i, j];
  }
  
  export function delayRendering(callback) {
    setTimeout(callback, 1000);
  }