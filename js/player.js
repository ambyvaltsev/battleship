import { computerBoard, controller, view } from "./index.js";


export class Player {
  constructor() {
    this.miss = []
  }
  fire(guess) {
    if (this.miss.includes(guess)) {
      view.displayMessage("Упс, ты сюда уже стрелял!");
      return true
    }
    for (let i = 0; i < computerBoard.ships.length; i++) {
      let ship = computerBoard.ships[i];
      let index = ship.locations.indexOf(guess);
      if (ship.hits[index] === "hit") {
        view.displayMessage("Упс, ты сюда уже стрелял!");
        return true;
      } else if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("Попал!");
        if (this.isSunk(ship)) {
          view.displayMessage("Корабль потоплен!");
          computerBoard.shipsSunk++;
        }
        return true;
      }
    }
    this.miss.push(guess)
    view.displayMiss(guess);
    view.displayMessage("Мимо!");
    setTimeout(() => {
      controller.processComputerGuess();
    }, 2000);
    return false;
  }
  isSunk(ship) {
    return ship.hits.every(cell => cell === "hit") ? true : false; 
  }
}
