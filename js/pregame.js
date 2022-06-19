export class Pregame  {
  constructor() {
    this.angle = 0
    this.choice = null
    this.random = null
    this.time = null
  }
  loader(coin) {
    this.choice = coin === "eagle" ?  1 : 0
    this.random = Math.floor(Math.random() * 2);
    document.querySelector(".choice__items").style.display = "none";
    document.querySelector(".choice__items-loader").style.display = "flex";
    let rotateId = setInterval(() => {
      if (this.angle == 360) this.angle = 0;
      if (this.angle == 90) {
        document.querySelector("#eagle1").src = "img/tail.png";
      }
      if (this.angle == 270) {
        document.querySelector("#eagle1").src = "img/eagle.png";
      }
      this.angle = this.angle + 5;
      document.querySelector("#eagle1").style.transform = "rotateY(" + this.angle + "deg)";
    }, 27);
    this.setTimer();
    setTimeout(() => {
      clearInterval(rotateId);
      this.processChoice();
    }, this.time);
  }
  processChoice() {
    document.querySelector(".choice__waiting-text").textContent = "";
    document.querySelector(".choice__btn-ok").classList.add("_active");
    if (this.choice == this.random) {
      document.querySelector(".message__text").textContent = "Вы ходите первым";
    } else {
      document.querySelector(".message__text").textContent = "Противник ходит первым";
    }
  }
  setTimer() {
    if (this.choice == 1) {
      this.time = this.choice == this.random ? 2000 : 3000
    }
    if (this.choice == 0) {
      this.time = this.choice == this.random ? 3000 : 2000
    }
  }
};