
class Ship {
  constructor(className, decks) {
    this.element = document.createElement("div");
    this.element.classList.add(className);
    this.element.connected = this;
    this.element.style.display = "none";
    this.decks = decks;
  }
  disconectFromDOM() {
    this.element.connected = null;
  }
}

export class GamePanel {
  constructor() {
    this.currentShip = null;
    this.dock = document.querySelector(".game-panel__ship");
    this.ships = [];
    this.direction = false;
    this.isTurned = false;
  }
  addShips(array) {
    array.forEach((item) => {
      this.ships.push(new Ship(item.className, item.length));
    });
    this.ships.forEach((ship) => {
      this.dock.append(ship.element);
      if (ship.element.classList.contains("ship__four-deck")) {
        ship.element.style.display = "block";
      }
    });
  }
}
