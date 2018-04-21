// battleship.js

function createBoard(positions = 10) {
  return Array(positions).fill(Array(positions).fill('.'))
}

function placeShips(board) {
  place('tug', board)
  place('destroyer', board)
  place('submarine', board)
  place('battleship', board)
  place('cruiser', board)
}

function place(type = '', board) {
  let direction = Math.random() <= 0.5 ? 'h' : 'v'
  switch (type.toLowerCase()) {
    case 'tug':
      return insertShip(2, 'T', direction, board)
    case 'destroyer':
      return insertShip(3, 'D', direction, board)
    case 'submarine':
      return insertShip(3, 'S', direction, board)
    case 'battleship':
      return insertShip(4, 'B', direction, board)
    case 'cruiser':
      return insertShip(5, 'C', direction, board)
  }
}

function insertShip(length, title, direction, board) {
  console.log('Inserting ship of length', length, 'title', title, 'in direction', direction)
  if (direction === 'h') {
    findHorizontalRun(length, board)
  } else {

  }
}

function findHorizontalRun(length, board) {
  let max = board.length - length   // farthest possible column fitting length
  var rows = Array(board.length).fill(0).map((u, i) => i)
  console.log(rows)
}

function findVerticalRun(length, board) {

}

function emptyAt(row, column, board) {
  return board[row][column] === '.'
}

function renderBoard(board) {
  for (var row = 0; row < board.length; row++) {
    var columns = board[row]
    console.log(columns.join(' '))
  }
}

var gameboard = createBoard(10)
placeShips(gameboard)
renderBoard(gameboard)
