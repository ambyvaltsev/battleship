let log = console.log;
let dir = console.dir;
//  -----------------------
import { correctionPosition, appendShipInBoard } from "./funcs.js";
import { ComputerBoard } from "./computerBoard.js";
import { PlayerBoard } from "./playerBoard.js";
import { Computer } from "./computer.js";
import { Player } from "./player.js";
import { Controller } from "./controller.js";
import { Pregame } from "./pregame.js";
import { View } from "./view.js";
import { Battleship } from "./battleship.js";
import { GamePanel } from "./gamePanel.js";

const battleship = new Battleship();
export const computerBoard = new ComputerBoard();
export const playerBoard = new PlayerBoard();
export const computer = new Computer();
export const player = new Player();
export const controller = new Controller();
export const pregame = new Pregame();
export const view = new View();
export const gamePanel = new GamePanel();

gamePanel.addShips(playerBoard.ships);

document.querySelector(".computer__board").addEventListener("click", function (e) {
  controller.processPlayerGuess(e.target.id);
});
document.querySelector(".choice__items").addEventListener("click", function (e) {
  pregame.loader(e.target.id);
});
document.addEventListener("DOMContentLoaded", function () {
  computerBoard.generateShipLocations();
  controller.unlockStart();
});
document.querySelector(".error__ok").addEventListener("click", function () {
  document.querySelector(".error").style.display = "none";
});


document.querySelector(".choice__btn-ok").addEventListener("click", function () {
  document.querySelector(".message__choice").classList.remove("_active");
  if (!pregame.choice == pregame.random) {
    controller.computerPermission = true;
    setTimeout(() => {
      controller.processComputerGuess();
    }, 3000);
  } else {
    controller.playerPermission = true;
  }
});

document.addEventListener("pointerdown", function (e) {
  e.preventDefault();
  let target = e.target.connected;
  if (target) {
    target.element.setPointerCapture(e.pointerId);
    battleship.offsetX = e.offsetX;
    battleship.offsetY = e.offsetY;
    battleship.move = true;
  }
});
document.addEventListener("pointermove", function (e) {
  let target = e.target.connected;
  if (target) {
    if (battleship.move) {
      gamePanel.currentShip = e.target.connected;
      let ship = e.target.connected.element;
      battleship.board.append(ship);
      ship.style.position = "absolute";
      ship.style.left = e.offsetX - battleship.offsetX + ship.offsetLeft + "px";
      ship.style.top = e.offsetY - battleship.offsetY + ship.offsetTop + "px";
      ship.style.display = "none";
      let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      ship.style.display = "block";
      if (!elemBelow) return;
      let droppableBelow = elemBelow.closest(".boards__player");
      if (droppableBelow) {
        gamePanel.direction = true;
        if (ship.offsetLeft < 0) {
          ship.style.left = 0 + "px";
        }
        if (ship.offsetLeft > battleship.board.offsetWidth - ship.offsetWidth) {
          ship.style.left = battleship.board.offsetWidth - ship.offsetWidth + "px";
        }
        if (ship.offsetTop < 0) {
          ship.style.top = 0 + "px";
        }
        if (ship.offsetTop > battleship.board.offsetHeight - ship.offsetHeight) {
          ship.style.top = battleship.board.offsetHeight - ship.offsetHeight + "px";
        }
      }
    }
  }
});
document.addEventListener("pointerup", function (e) {
  let target = e.target.connected;
  if (target) {
    battleship.move = false;
  }
});
document.querySelector(".btn__direction").addEventListener("click", function (e) {
  let ship = gamePanel.currentShip.element;
  let shipSize = battleship.cellSize * gamePanel.currentShip.decks;
  gamePanel.isTurned = !gamePanel.isTurned;
  if (gamePanel.direction) {
    if (!gamePanel.isTurned) {
      appendShipInBoard(ship, battleship.board);
      ship.style.width = shipSize + "px";
      ship.style.height = battleship.cellSize + "px";
      ship.style.backgroundRepeat = "repeat-x";
      ship.style.backgroundSize = `${100 / gamePanel.currentShip.decks}% 100%`;
    } else {
      appendShipInBoard(ship, battleship.board);
      ship.style.width = battleship.cellSize + "px";
      ship.style.height = shipSize + "px";
      ship.style.backgroundRepeat = "repeat-y";
      ship.style.backgroundSize = `100% ${100 / gamePanel.currentShip.decks}%`;
    }
  }
});
document.querySelector(".btn__set").addEventListener("click", function (e) {
  let ship = gamePanel.currentShip.element;
  let error = 10;
  controller.unlockStart();
  if (
    (gamePanel.isTurned
      ? ship.offsetTop < battleship.boardSize - ship.clientWidth - battleship.cellSize + error
      : ship.offsetTop < battleship.cellSize * 9 + error) &&
    ship.offsetLeft > battleship.cellSize - error
  ) {
    appendShipInBoard(ship, battleship.board);
    correctionPosition(ship.offsetLeft, ship.offsetTop, ship, battleship.cellSize);
    let col = Math.round((ship.offsetLeft - battleship.cellSize) / battleship.cellSize);
    let row = Math.round(ship.offsetTop / battleship.cellSize);
    let location = [];
    location.push(row, col);
    let direction = gamePanel.isTurned ? 0 : 1;
    if (playerBoard.settingShip(location, direction)) {
      gamePanel.currentShip.disconectFromDOM();
      ship.style.border = "none";
      gamePanel.isTurned = false;
    }
    playerBoard.position++;
    if (playerBoard.position < 10) {
      gamePanel.ships[playerBoard.position].element.style.display = "block";
    }
  }
});
document.querySelector(".btn__start").addEventListener("click", function () {
  document.querySelector(".message__choice").classList.add("_active");
  document.querySelector(".boards__computer").style.display = "block";
  document.querySelector(".player__game-panel").style.display = "none";
});
