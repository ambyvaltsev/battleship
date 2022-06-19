
export class View {
  displayMessage(msg) {
    let messageArea = document.querySelector(".boards__message");
    messageArea.innerHTML = msg;
  }
  displayHit(location) {
    let cell = document.getElementById(location);
    cell.classList.remove("ship");
    cell.classList.add("_hit");
  }
  displayMiss(location) {
    let cell = document.getElementById(location);
    cell.classList.add("_miss");
  }
  displayMessageError(msg) {
    let messageArea = document.querySelector(".error");
    let message = document.querySelector(".error__message");
    messageArea.style.display = "block";
    message.innerHTML = msg;
  }
};