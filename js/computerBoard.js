import { collectCellsDirection1 } from "./funcs.js";
import { collectCellsDirection0 } from "./funcs.js";

export class ComputerBoard {
  constructor() {
    this.numberShip = 10;
    this.ships = [
      {
        locations: [0, 0, 0, 0],
        hits: ["", "", "", ""],
        length: 4,
        direction: null,
      },
      { locations: [0, 0, 0], hits: ["", "", ""], length: 3, direction: null },
      { locations: [0, 0, 0], hits: ["", "", ""], length: 3, direction: null },
      { locations: [0, 0], hits: ["", ""], length: 2, direction: null },
      { locations: [0, 0], hits: ["", ""], length: 2, direction: null },
      { locations: [0, 0], hits: ["", ""], length: 2, direction: null },
      { locations: [0], hits: [""], length: 1, direction: null },
      { locations: [0], hits: [""], length: 1, direction: null },
      { locations: [0], hits: [""], length: 1, direction: null },
      { locations: [0], hits: [""], length: 1, direction: null },
    ];
    this.boardSize = 10;
    this.shipsSunk = 0;
    this.cells = [];
  }
  generateShipLocations() {
    for (let i = 0; i < this.ships.length; i++) {
      let locations;
      let direction;
      let newShip;
      if (i == 0) {
        do {
          newShip = this.generateShip(4);
          locations = newShip[0];
          direction = newShip[1];
        } while (this.collision(locations));
        this.ships[i].locations = locations;
        this.ships[i].direction = direction;
        for (let j = 0; j < this.ships[i].locations.length; j++) {
          let cell = this.ships[i].locations[j];
          let row = Number(cell[0]);
          let col = Number(cell[1]);
          if (this.ships[i].direction == 1) {
            collectCellsDirection1(this.cells, row, col, j, this.ships[i].locations.length);
          } else {
            collectCellsDirection0(this.cells, row, col, j, this.ships[i].locations.length);
          }
        }
        this.cells = this.cells.filter((item, index) => index === this.cells.indexOf(item));
        this.cells = this.cells.filter((item) => item.length < 3);
      } else if (i > 0 && i < 3) {
        do {
          newShip = this.generateShip(3);
          locations = newShip[0];
          direction = newShip[1];
        } while (this.collision(locations));
        this.ships[i].locations = locations;
        this.ships[i].direction = direction;
        for (let j = 0; j < this.ships[i].locations.length; j++) {
          let cell = this.ships[i].locations[j];
          let row = Number(cell[0]);
          let col = Number(cell[1]);
          if (this.ships[i].direction == 1) {
            collectCellsDirection1(this.cells, row, col, j, this.ships[i].locations.length);
          } else {
            collectCellsDirection0(this.cells, row, col, j, this.ships[i].locations.length);
          }
        }
        this.cells = this.cells.filter((item, index) => index === this.cells.indexOf(item));
        this.cells = this.cells.filter((item) => item.length < 3);
      } else if (i >= 3 && i < 6) {
        do {
          newShip = this.generateShip(2);
          locations = newShip[0];
          direction = newShip[1];
        } while (this.collision(locations));
        this.ships[i].locations = locations;
        this.ships[i].direction = direction;
        for (let j = 0; j < this.ships[i].locations.length; j++) {
          let cell = this.ships[i].locations[j];
          let row = Number(cell[0]);
          let col = Number(cell[1]);
          if (this.ships[i].direction == 1) {
            collectCellsDirection1(this.cells, row, col, j, this.ships[i].locations.length);
          } else {
            collectCellsDirection0(this.cells, row, col, j, this.ships[i].locations.length);
          }
        }
        this.cells = this.cells.filter((item, index) => index === this.cells.indexOf(item));
        this.cells = this.cells.filter((item) => item.length < 3);
      } else if (i >= 6) {
        do {
          newShip = this.generateShip(1);
          locations = newShip[0];
          direction = newShip[1];
        } while (this.collision(locations));
        this.ships[i].locations = locations;
        this.ships[i].direction = direction;
        let cell = this.ships[i].locations[0];
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
        this.cells = this.cells.filter((item, index) => index === this.cells.indexOf(item));
        this.cells = this.cells.filter((item) => item.length < 3);
      }
    }
  }
  generateShip(numberDeck) {
    let direction = Math.floor(Math.random() * 2);
    let row, col;
    let newShipInfo = [];
    let newShipLocations = [];
    do {
      if (direction === 1) {
        // horizontally
        row = Math.floor(Math.random() * this.boardSize);
        col = Math.floor(Math.random() * (this.boardSize - numberDeck));
      } else {
        // vertically
        row = Math.floor(Math.random() * (this.boardSize - numberDeck));
        col = Math.floor(Math.random() * this.boardSize);
      }
    } while (this.matchingCell(row, col));
    for (let i = 0; i < numberDeck; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push(row + i + "" + col);
      }
    }
    newShipInfo.push(newShipLocations, direction);
    return newShipInfo;
  }
  collision(locations) {
    return locations.some((location) => this.cells.includes(location)) ? true : false;
  }
  matchingCell(row, col) {
    let cell = row + "" + col;
    return this.cells.includes(cell) ? true : false
  }
}
