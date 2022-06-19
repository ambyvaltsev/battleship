import { collectCellsDirection1 } from "./funcs.js";
import { collectCellsDirection0 } from "./funcs.js";
import { view } from "./index.js";

export class PlayerBoard {
  constructor() {
    this.numberShip = 10;
    this.position = 0;
    this.shipsSunk = 0;
    this.cells = [];
    this.ships = [
      {
        locations: [0, 0, 0, 0],
        hits: ["", "", "", ""],
        length: 4,
        direction: null,
        className: "ship__four-deck",
      },
      {
        locations: [0, 0, 0],
        hits: ["", "", ""],
        length: 3,
        direction: null,
        className: "ship__three-deck",
      },
      {
        locations: [0, 0, 0],
        hits: ["", "", ""],
        length: 3,
        direction: null,
        className: "ship__three-deck",
      },
      {
        locations: [0, 0],
        hits: ["", ""],
        length: 2,
        direction: null,
        className: "ship__two-deck",
      },
      {
        locations: [0, 0],
        hits: ["", ""],
        length: 2,
        direction: null,
        className: "ship__two-deck",
      },
      {
        locations: [0, 0],
        hits: ["", ""],
        length: 2,
        direction: null,
        className: "ship__two-deck",
      },
      {
        locations: [0],
        hits: [""],
        length: 1,
        direction: null,
        className: "ship__one-deck",
      },
      {
        locations: [0],
        hits: [""],
        length: 1,
        direction: null,
        className: "ship__one-deck",
      },
      {
        locations: [0],
        hits: [""],
        length: 1,
        direction: null,
        className: "ship__one-deck",
      },
      {
        locations: [0],
        hits: [""],
        length: 1,
        direction: null,
        className: "ship__one-deck",
      },
    ];
  }
  settingShip(location, direction) {
    let [nRow, nCol] = location;
    if (this.position == 0) {
      let locations = this.generateShip(nRow, nCol, direction, 4);
      if (!this.collision(locations, nRow, nCol, direction)) {
        view.displayMessageError("Выберите другое место");
        return;
      }
      this.ships[this.position].locations = locations;
      this.ships[this.position].direction = direction;
      for (let j = 0; j < this.ships[this.position].locations.length; j++) {
        let cell = this.ships[this.position].locations[j];
        let row = Number(cell[0]);
        let col = Number(cell[1]);
        if (this.ships[this.position].direction == 1) {
          collectCellsDirection1(this.cells, row, col, j, this.ships[this.position].locations.length);
        } else {
          collectCellsDirection0(this.cells, row, col, j, this.ships[this.position].locations.length);
        }
      }
      this.cells = this.cells.filter((item, index) => index === this.cells.indexOf(item));
      this.cells = this.cells.filter((item) => item.length < 3);
    } else if (this.position > 0 && this.position < 3) {
      let locations = this.generateShip(nRow, nCol, direction, 3);
      if (!this.collision(locations, nRow, nCol, direction)) {
        view.displayMessageError("Выберите другое место");
        return;
      }
      this.ships[this.position].locations = locations;
      this.ships[this.position].direction = direction;
      for (let j = 0; j < this.ships[this.position].locations.length; j++) {
        let cell = this.ships[this.position].locations[j];
        let row = Number(cell[0]);
        let col = Number(cell[1]);
        if (this.ships[this.position].direction == 1) {
          collectCellsDirection1(this.cells, row, col, j, this.ships[this.position].locations.length);
        } else {
          collectCellsDirection0(this.cells, row, col, j, this.ships[this.position].locations.length);
        }
      }
      this.cells = this.cells.filter((item, index) => index === this.cells.indexOf(item));
      this.cells = this.cells.filter((item) => item.length < 3);
    } else if (this.position >= 3 && this.position < 6) {
      let locations = this.generateShip(nRow, nCol, direction, 2);
      if (!this.collision(locations, nRow, nCol, direction)) {
        view.displayMessageError("Выберите другое место");
        return;
      }
      this.ships[this.position].locations = locations;
      this.ships[this.position].direction = direction;
      for (let j = 0; j < this.ships[this.position].locations.length; j++) {
        let cell = this.ships[this.position].locations[j];
        let row = Number(cell[0]);
        let col = Number(cell[1]);
        if (this.ships[this.position].direction == 1) {
          collectCellsDirection1(this.cells, row, col, j, this.ships[this.position].locations.length);
        } else {
          collectCellsDirection0(this.cells, row, col, j, this.ships[this.position].locations.length);
        }
      }
      this.cells = this.cells.filter((item, index) => index === this.cells.indexOf(item));
      this.cells = this.cells.filter((item) => item.length < 3);
    } else if (this.position >= 6 && this.position < 10) {
      let locations = this.generateShip(nRow, nCol, 1, 1);
      if (!this.collision(locations, nRow, nCol)) {
        view.displayMessageError("Выберите другое место");
        return;
      }
      this.ships[this.position].locations = locations;
      this.ships[this.position].direction = direction;
      let cell = this.ships[this.position].locations[0];
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
    return true;
  }
  generateShip(row, col, direction, numberDeck) {
    let newShipLocations = [];
    for (let i = 0; i < numberDeck; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push(row + i + "" + col);
      }
    }
    return newShipLocations;
  }

  collision(locations, row, col, direction) {
    const num = direction === 1 ? col : row;
    if (num + locations.length - 1 > 9) {
      this.position--;
      return false;
    }
    for (let i = 0; i < locations.length; i++) {
      if (this.cells.indexOf(locations[i]) >= 0) {
        this.position--;
        return false;
      }
    }
    return true;
  }
}
