import Ship from './ship.js'

export default class Gameboard {
  missedAttacks = [];
  allSunk = false;

  constructor() {
    this.board = Array.from(Array(10), () => new Array(10).fill(null));
    this.carrier = new Ship(5, 'carrier');
    this.battleship = new Ship(4, 'battleship');
    this.cruiser = new Ship(3, 'cruiser');
    this.submarine = new Ship(3, 'submarine');
    this.destroyer = new Ship(2, 'destroyer');
    this.ships = [
      this.carrier,
      this.battleship,
      this.cruiser,
      this.submarine,
      this.destroyer,
    ];
  }

  canPlaceShip(ship, coordinates, axis) {
    if (axis === 'x') {
      for (
        let i = coordinates[0], j = coordinates[1], k = 0;
        k < ship.shipLength && i < 10 && j < 10;
        j++, k++
      ) {
        if (this.board[i][j] !== null) {
          return false;
        }

        if (j === 9 && k < ship.shipLength - 1) {
          return false;
        }

        continue;
      }
      return true;
    } else {
      for (
        let i = coordinates[0], j = coordinates[1], k = 0;
        k < ship.shipLength && i < 10 && j < 10;
        i++, k++
      ) {
        if (this.board[i][j] !== null) {
          return false;
        }

        if (i === 9 && k < ship.shipLength - 1) {
          return false;
        }

        continue;
      }
      return true;
    }
  }

  placeShip(ship, coordinates, axis) {
    if (!this.canPlaceShip(ship, coordinates, axis)) return false;

    if (axis === 'x') {
      for (
        let i = coordinates[0], j = coordinates[1], k = 0;
        k < ship.shipLength;
        j++, k++
      ) {
        this.board[i][j] = { hit: false, ship };
      }
    } else {
      for (
        let i = coordinates[0], j = coordinates[1], k = 0;
        k < ship.shipLength;
        i++, k++
      ) {
        this.board[i][j] = { hit: false, ship };
      }
    }

    return true;
  }

  #isOccupied(coordinates) {
    if (this.board[coordinates[0]][coordinates[1]] !== null) {
      return true;
    }
    return false;
  }

  #areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  #areValidCoordinates(coordinates) {
    if (
      coordinates[0] < 0 ||
      coordinates[0] > 9 ||
      coordinates[1] < 0 ||
      coordinates[1] > 9
    ) {
      return false;
    }

    return true;
  }

  receiveAttack(coordinates) {
    if (!this.#isOccupied(coordinates)) {
      this.missedAttacks.push(coordinates);
      return;
    }

    if (!this.#areValidCoordinates(coordinates)) {
      return;
    }

    this.board[coordinates[0]][coordinates[1]].ship.hit();
    this.board[coordinates[0]][coordinates[1]].hit = true;

    this.allSunk = this.#areAllShipsSunk();
  }
}