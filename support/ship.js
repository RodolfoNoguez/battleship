export default class Ship {
    #hits = 0;
  
    constructor(length, name) {
      this.shipLength = length;
      this.name = name;
    }
  
    get hits() {
      return this.#hits;
    }
  
    hit() {
      if (this.#hits < this.shipLength) {
        this.#hits += 1;
      }
    }
  
    isSunk() {
      if (this.#hits === this.shipLength) {
        return true;
      }
      return false;
    }
  }

