import { playerBoard, player, computer, computerBoard, view } from "./index.js";

export class Controller {
  constructor() {
    this.playerPermission = false;
    this.computerPermission = false;
    this.playerGuesses = 0;
    this.computerGuesses = 0;
  }
  processPlayerGuess(guess) {
    if (guess && this.playerPermission) {
      let hit = player.fire(guess);
      this.playerGuesses++;
      if (!hit) {
        this.playerPermission = false;
        this.computerPermission = true
      }
      if (hit && computerBoard.shipsSunk === computerBoard.numberShip) {
        view.displayMessage("Одержана победа за " + this.playerGuesses + " ходов");
      }
    }
  }
  processComputerGuess() {
    this.computerGuesses++;
    let hit = computer.fire();
    if (!hit) {
        this.playerPermission = true;
        this.computerPermission = false
      }
    if (hit) {
      if (playerBoard.shipsSunk === playerBoard.numberShip) {
        view.displayMessage("Противник выиграл за " + this.computerGuesses + " ходов");
      } else {
        setTimeout(() => {
          this.processComputerGuess();
        }, 2000);
      }
    }
  }
  unlockStart() {
    playerBoard.position == 9
      ? (document.querySelector(".btn__start").disabled = false)
      : (document.querySelector(".btn__start").disabled = true);
  }
}
