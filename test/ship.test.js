const ship = require('../support/ship');

const Ship = new ship();


test('test ship with length 3', () => {
    const Ship = new ship(3);
    expect(Ship.length).toBe(3);
    expect(Ship.hits).toBe(0);
})

test('test 1 hit', () => {
    const Ship = new ship(4);
    Ship.hit();
    expect(Ship.hits).toBe(1);
})

test('check if isSunk works', () => {
    const Ship = new ship(3);
    Ship.hit();
    Ship.hit();
    Ship.hit();
    expect(Ship.isSunk()).toBe(true)

})
