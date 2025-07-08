
import GameBoard from './gameBoard.js';

export default class Player {
    constructor(name = 'Computer') {
      this.name = name;
      this.gameboard = new GameBoard();
    }
  }


