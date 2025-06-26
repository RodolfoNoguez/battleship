const Ship = require('./ship');

class GameBoard{
    constructor(size = 10){
        this.size = size;
        this.board = Array(size).fill(null).map(() => Array(size).fill(null));
        this.ships = [];
        this.missedAttacks = [];

    }

    placeShip(length, startX, startY, isHorizontal = true){
        const ship = new Ship(length);
        const coordinates = [];
        for(let i=0; i < length; i++){
            const x = isHorizontal ? startX +i  : startX;
            const y = isHorizontal ? startY : startY + i;

            if(x >= this.size || y >= this.size || this.board[y][x] !== null){
                throw new Error('Invalid Ship Placement')
            }

            coordinates.push([x,y]);
            this.board[y][x] = ship;
        }

        this.ships.push({ ship, coordinates })

    }

    receiveAttack(x,y){
        const target = this.board[y][x];
        if(target === null){
            this.missedAttacks.push([x,y]);
            this.board[y][x] = "miss"
            return 'miss'
        }

        if(typeof target.hit === 'function'){
            target.hit();
            this.board[y][x] = 'hit';
            return 'hit';
        }

        return 'already hit'
    }

    allShipsSunk(){
        return this.ships.every(({ ship }) => ship.isSunk());
    }
}


module.exports = GameBoard;