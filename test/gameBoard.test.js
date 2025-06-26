const GameBoard = require('../support/gameBoard');

describe('GameBoard', () => {
  let board;

  beforeEach(() => {
    board = new GameBoard();
  });

  test('places a ship on the board', () => {
    board.placeShip(2, 0, 0, true);
    expect(board.board[0][0]).not.toBeNull();
    expect(board.board[0][1]).not.toBeNull();
  });

  test('throws error for overlapping ships', () => {
    board.placeShip(2, 0, 0, true);
    expect(() => board.placeShip(2, 0, 0, true)).toThrow('Invalid Ship Placement');
  });

  test('registers a miss', () => {
    const result = board.receiveAttack(0, 0);
    expect(result).toBe('miss');
    expect(board.board[0][0]).toBe('miss');
    expect(board.missedAttacks).toContainEqual([0, 0]);
  });

  test('registers a hit', () => {
    board.placeShip(1, 1, 1);
    const result = board.receiveAttack(1, 1);
    expect(result).toBe('hit');
    expect(board.board[1][1]).toBe('hit');
  });

  test('detects all ships sunk', () => {
    board.placeShip(1, 0, 0);
    board.receiveAttack(0, 0);
    expect(board.allShipsSunk()).toBe(true);
  });

  test('does not allow hitting same spot twice', () => {
    board.placeShip(1, 2, 2);
    board.receiveAttack(2, 2);
    const result = board.receiveAttack(2, 2);
    expect(result).toBe('already hit');
  });
});
