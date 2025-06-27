const Player = require('../support/player');
const GameBoard = require('../support/gameBoard');
const Ship = require('../support/ship');  // Add this import

describe('Player class', () => {
  let player;
  let opponentBoard;

  beforeEach(() => {
    player = new Player('real');
    opponentBoard = new GameBoard();
  });

  test('Player has a gameBoard instance', () => {
    expect(player.gameBoard).toBeInstanceOf(GameBoard);
  });

  test('Player can fire a shot on opponent board', () => {
    const spy = jest.spyOn(opponentBoard, 'receiveAttack');

    player.fireShot(0, 0, opponentBoard);

    expect(spy).toHaveBeenCalledWith(0, 0);

    spy.mockRestore();
  });

  test('Firing a shot returns hit or miss as expected', () => {
    const testShip = new Ship(1, 'testShip');  // This needs Ship class
    opponentBoard.placeShip(testShip, [0, 0], 'x');

    let result = player.fireShot(0, 0, opponentBoard);
    expect(result).toBe('hit');

    result = player.fireShot(1, 1, opponentBoard);
    expect(result).toBe('miss');
  });
});
