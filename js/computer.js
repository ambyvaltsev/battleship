import { collectCellsDirection1 } from "./funcs.js";
import { collectCellsDirection0 } from "./funcs.js";
import { playerBoard, view } from "./index.js";

export class Computer {
  constructor() {
    this.wreckedDecks = 0;
    this.nextShot = false;
    this.cells = [];
    this.hits = [];
  }
  fire() {
    let shot;
    if (this.nextShot && this.wreckedDecks == 1) {
      let lastShot = this.hits[this.hits.length - 1];
      let [row, col] = lastShot.split("");
      if (Number(row) + 1 <= 9 && this.cells.includes(Number(row) + 1 + "" + col) == false) {
        shot = Number(row) + 1 + "" + col;
      } else if (Number(row) - 1 >= 0 && this.cells.includes(Number(row) - 1 + "" + col) == false) {
        shot = Number(row) - 1 + "" + col;
      } else if (Number(col) + 1 <= 9 && this.cells.includes(row + "" + (Number(col) + 1)) == false) {
        shot = row + "" + (Number(col) + 1);
      } else if (Number(col) - 1 >= 0 && this.cells.includes(row + "" + (Number(col) - 1)) == false) {
        shot = row + "" + (Number(col) - 1);
      }
    }
    if (this.nextShot && this.wreckedDecks >= 2) {
      let lastShot = this.hits[this.hits.length - 1];
      let [row, col] = lastShot.split("");
      let direction = this.detetminDirection();
      if (direction == 1) {
        if (Number(col) + 1 <= 9 && !this.cells.includes(row + "" + (Number(col) + 1))) {
          shot = row + "" + (Number(col) + 1);
        } else {
          if (this.cells.includes(row + "" + (Number(col) - 1))) {
            shot = row + "" + (Number(col) - 2);
          } else if (this.cells.includes(row + "" + (Number(col) - 2))) {
            shot = row + "" + (Number(col) - 3);
          } else {
            shot = row + "" + (Number(col) - 1);
          }
        }
      } else {
        if (Number(row) + 1 <= 9 && !this.cells.includes(Number(row) + 1 + "" + col)) {
          shot = Number(row) + 1 + "" + col;
        } else {
          if (this.cells.includes(Number(row) - 1 + "" + col)) {
            shot = Number(row) - 2 + "" + col;
          } else if (this.cells.includes(Number(row) - 2 + "" + col)) {
            shot = Number(row) - 3 + "" + col;
          } else {
            shot = Number(row) - 1 + "" + col;
          }
        }
      }
    }
    if (this.nextShot == false) {
      do {
        let row, col;
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        shot = row + "" + col;
      } while (this.shotTest(shot));
    }
    this.cells.push(shot);
    for (let i = 0; i < playerBoard.ships.length; i++) {
      let ship = playerBoard.ships[i];
      let index = ship.locations.indexOf(shot);
      if (index >= 0) {
        this.nextShot = true;
        this.wreckedDecks = this.wreckedDecks + 1;
        this.hits.push(shot);
        ship.hits[index] = "hit";
        view.displayHit(shot + "x");
        view.displayMessage("Противник попал!");
        if (this.isSunk(ship)) {
          view.displayMessage("Противник потопил корабль!");
          playerBoard.shipsSunk++;
          this.wreckedDecks = 0;
          this.nextShot = false;
          this.searchEmptyCells(ship);
        }
        return true;
      }
    }
    view.displayMiss(shot + "x");
    view.displayMessage("Противник промазал!");
    return false;
  }
  isSunk(ship) {
    return ship.hits.every(cell => cell === "hit") ? true : false; 
  }
  shotTest(shot) {
    return this.cells.includes(shot) ? true : false;
  }
  detetminDirection() {
    let firstHit = this.hits[this.hits.length - 2];
    let secondtHit = this.hits[this.hits.length - 1];
    if (firstHit[0] == secondtHit[0]) return 1;
    if (firstHit[1] == secondtHit[1]) return 0;

  }
  searchEmptyCells(ship) {
    if (ship.length == 1) {
      let cell = ship.locations[0];
      let row = Number(cell[0]);
      let col = Number(cell[1]);
      this.cells.push(
        row + "" + col,
        row + 1 + "" + (col - 1),
        row + "" + (col - 1),
        row - 1 + "" + (col - 1),
        row - 1 + "" + col,
        row - 1 + "" + (col + 1),
        row + "" + (col + 1),
        row + 1 + "" + (col + 1),
        row + 1 + "" + col
      );
    } else if (ship.length == 2) {
      for (let j = 0; j < ship.locations.length; j++) {
        let cell = ship.locations[j];
        let row = Number(cell[0]);
        let col = Number(cell[1]);
        if (ship.direction == 1) {
          collectCellsDirection1(this.cells, row, col, j, ship.locations.length);
        } else {
          collectCellsDirection0(this.cells, row, col, j, ship.locations.length);
        }
      }
    } else if (ship.length == 3) {
      for (let j = 0; j < ship.locations.length; j++) {
        let cell = ship.locations[j];
        let row = Number(cell[0]);
        let col = Number(cell[1]);
        if (ship.direction == 1) {
          collectCellsDirection1(this.cells, row, col, j, ship.locations.length);
        } else {
          collectCellsDirection0(this.cells, row, col, j, ship.locations.length);
        }
      }
    } else if (ship.length == 4) {
      for (let j = 0; j < ship.locations.length; j++) {
        let cell = ship.locations[j];
        let row = Number(cell[0]);
        let col = Number(cell[1]);
        if (ship.direction == 1) {
          collectCellsDirection1(this.cells, row, col, j, ship.locations.length);
        } else {
          collectCellsDirection0(this.cells, row, col, j, ship.locations.length);
        }
      }
    }
    this.cells = this.cells.filter((item, index) => index === this.cells.indexOf(item));
    this.cells = this.cells.filter((item) => item.length < 3);
  }
}
