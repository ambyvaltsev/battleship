export class Battleship {
  constructor() {
    this.numberShip = 10;
    this.board = document.querySelector(".boards__player");
    this.boardSize = document.querySelector(".player__board").offsetWidth;
    this.offsetX = null;
    this.offsetY = null;
    this.move = false;
  }
  get cellSize() {
    return this.board.offsetWidth / 11;
  }
}
