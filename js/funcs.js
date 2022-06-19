export function collectCellsDirection1(array, row, col, index, length) {
  if (index == 0) {
    array.push(
      row + "" + col,
      row + 1 + "" + col,
      row + 1 + "" + (col - 1),
      row + "" + (col - 1),
      row - 1 + "" + (col - 1),
      row - 1 + "" + col
    );
  } else if (index > 0 && index < length - 1) {
    array.push(row + "" + col, row - 1 + "" + col, row + 1 + "" + col);
  } else if (index == length - 1) {
    array.push(
      row + "" + col,
      row - 1 + "" + col,
      row - 1 + "" + (col + 1),
      row + "" + (col + 1),
      row + 1 + "" + (col + 1),
      row + 1 + "" + col
    );
  }
}
export function collectCellsDirection0(array, row, col, index, length) {
  if (index == 0) {
    array.push(
      row + "" + col,
      row + "" + (col - 1),
      row - 1 + "" + (col + 1),
      row - 1 + "" + col,
      row - 1 + "" + (col - 1),
      row + "" + (col + 1)
    );
  } else if (index > 0 && index < length - 1) {
    array.push(row + "" + col, row + "" + (col - 1), row + "" + (col + 1));
  } else if (index == length - 1) {
    array.push(
      row + "" + col,
      row + "" + (col + 1),
      row + 1 + "" + (col + 1),
      row + 1 + "" + col,
      row + 1 + "" + (col - 1),
      row + "" + (col - 1)
    );
  }
}

export function correctionPosition(left, top, ship, cellSize) {
  let locationX = (left / cellSize).toFixed(0) * cellSize;
  let locationY = (top / cellSize).toFixed(0) * cellSize;
  ship.style.top = locationY + "px";
  ship.style.left = locationX + "px";
}

export function appendShipInBoard(ship, board) {
  if (!board.contains(ship)) {
    board.append(ship);
    ship.style.position = "absolute";
    ship.style.left = ship.offsetLeft - board.offsetLeft + "px";
    ship.style.top = ship.offsetTop - board.offsetTop + "px";
  }
}

