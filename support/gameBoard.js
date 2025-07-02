import Ship from './ship.js'

export default class GameBoard{
    constructor(size = 10){
        this.size = size;
        this.board = Array(size).fill(null).map(() => Array(size).fill(null));
        this.missedAttacks = [];

        this.carrier = new Ship(5, 'carrier')
        this.battleship = new Ship(4, 'battleship')
        this.cruiser = new Ship(3, 'cruiser')
        this.submarine = new Ship(3, 'submarine')
        this.destroyer = new Ship(2, 'destroyer')

        this.ships = [
            this.carrier,
            this.battleship,
            this.cruiser,
            this.submarine,
            this.destroyer
        ];
    }

    
    placeShip(ship, coordinates, axis) {
        console.log('placeShip called with coordinates:', coordinates);
        if (!Array.isArray(coordinates)) {
            console.trace('Bad coordinates passed!');
          }

        if (!this.canPlaceShip(ship, coordinates, axis)) return false;
      
        const [startX, startY] = coordinates;
      
        if (axis === 'x') {
          for (let i = 0; i < ship.length; i++) {
            const x = startX + i;
            const y = startY;
            this.board[y][x] = { hit: false, ship };
          }
        } else {
          for (let i = 0; i < ship.length; i++) {
            const x = startX;
            const y = startY + i;
            this.board[y][x] = { hit: false, ship };
          }
        }
      
        return true;
      }
      
    canPlaceShip(ship, coordinates, axis) {
        console.log('canPlaceShip called with coordinates:', coordinates);
        if (!Array.isArray(coordinates)) {
            throw new TypeError(
              `coordinates must be an array, but got ${typeof coordinates}: ${coordinates}`
            );
          }

        const [startX, startY] = coordinates;
    
        for (let i = 0; i < ship.length; i++) {
            const x = axis === 'x' ? startX + i : startX;
            const y = axis === 'x' ? startY : startY + i;
        
            if (!this.#areValidCoordinates([x, y]) || this.#isOccupied([x, y])) {
                return false;
            }
        }
    
        return true;
    }

    #isOccupied([x, y]) {
        return this.board[y][x] !== null;
    }

    #areValidCoordinates([x, y]) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }
      
    
    receiveAttack(x, y) {
        const target = this.board[y][x];
    
        if (target === null) {
        this.missedAttacks.push([x, y]);
        this.board[y][x] = { missed: true };
        return "miss";
        }
    
        if (target && target.hit === false) {
        target.hit = true;
        target.ship.hit();
        return "hit";
        }
    
        return "already hit";
    }
      

    allShipsSunk(){
        return this.ships.every(ship => ship.isSunk());
    }
}


