
import GameBoard from './gameBoard.js';

export default class Player {
    constructor(name = 'computer') {
      this.name = name;
      this.gameboard = new GameBoard();
    }
  }


