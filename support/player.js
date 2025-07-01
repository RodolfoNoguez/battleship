const GameBoard = require('./gameBoard');

class Player {
    constructor(type = 'real') {
      if (type !== 'real' && type !== 'computer') {
        throw new Error("Player type must be 'real' or 'computer'");
      }
      this.type = type;
      this.gameboard = new GameBoard();
    }
    fireShot(x, y , opponentBoard){
        return opponentBoard.receiveAttack(x, y);
    }
  }

module.exports = Player