// battleship.js
// 
// Copyright 2018 Mutant Soup Software

class GameBoard {
  constructor(positions = 10) {
    this.positions = positions
    this.reset()
  }

  reset() {
    this.array = []
    for (var i = 0; i < this.positions; i++) {
      this.array.push(Array(this.positions).fill('.'))
    }
  }

  placeShips(ships = ['tug', 'destroyer', 'submarine', 'battleship', 'cruiser']) {
    ships.forEach(ship => this.place(ship))
  }

  place(ship) {
    let direction = Math.random() <= 0.5 ? 'h' : 'v'
    switch (ship.toLowerCase()) {
      case 'tug':
        this._insert('T', 2, direction)
        break
      case 'destroyer':
        this._insert('D', 3, direction)
        break
      case 'submarine':
        this._insert('S', 3, direction)
        break
      case 'battleship':
        this._insert('B', 4, direction)
        break
      case 'cruiser':
        this._insert('C', 5, direction)
        break
    }
  }

  fire(x, y) {
    console.log('Fire', x+','+y)
    let result = this._get(x, y)
    if (result === '.') {
      console.log('  MISS')
    } else {
      console.log('  HIT!')
    }
  }

  render() {
    this.array.forEach(row => console.log(row.join(' ')))
  }

//---
  _set(x, y, title) {
    try {
      this.array[x][y] = title      
    } catch (err) {
      console.log('Did not set board,', err)
    }
  }

  _get(x, y) {
    return this.array[x][y]
  }

  _row(y) {
    try {
      return this.array[y]
    } catch (err) {
      return undefined
    }
  }

  _column(x) {
    try {
      return this.array.map((y, i) => y[x])
    } catch (err) {
      return undefined
    }
  }

  _runs(array, length) {
    let scored = array.map(x => x === '.' ? 0 : 1)
    let slices = scored.map((_, i) => {
      let slice = scored.slice(i, i + length)
      return (slice.length == length && 
              slice.reduce((sum, num) => sum + num) === 0) ? i : -1
    }).filter(i => i != -1)
    return slices
  }

  _horizontalRuns(y, length) {
    return this._runs(this._row(y), length)
  }

  _verticalRuns(x, length) {
    return this._runs(this._column(x), length)
  }

  _randomHorizontalRun(length) {
    var runs = []
    for (var i = 0; i < this.positions; i++) {
      let h = this._horizontalRuns(i, length)
      if (h.length) {
        runs.push({row: i, runs: h})
      }
    }

    if (runs.length) {
      let y = runs[Math.floor(Math.random() * runs.length)]
      let x = y.runs[Math.floor(Math.random() * y.runs.length)]
      return {x: x, y: y.row}
    }

    return undefined
  }

  _randomVerticalRun(length) {
    var runs = []
    for (var i = 0; i < this.positions; i++) {
      let v = this._verticalRuns(i, length)
      if (v.length) {
        runs.push({column: i, runs: v})
      }
    }

    if (runs.length) {
      let x = runs[Math.floor(Math.random() * runs.length)]
      let y = x.runs[Math.floor(Math.random() * x.runs.length)]
      return {x: x.column, y: y}
    }
  }

  _insert(title, length, direction) {
    if (direction === 'h') {
      let point = this._randomHorizontalRun(length)
      for (var i = 0; i < length; i++) {
        this._set(point.x + i, point.y, title)
      }
    } else if (direction === 'v') {
      let point = this._randomVerticalRun(length)
      for (var i = 0; i < length; i++) {
        this._set(point.x, point.y + i, title)
      }
    }
  }
}


var gameboard = new GameBoard(10)
gameboard.placeShips()
gameboard.render()

gameboard.fire(0, 0)
gameboard.fire(1, 1)
gameboard.fire(2, 2)

console.log('---')
console.log('Resetting, placing specific ships (tug, battleship)')
gameboard.reset()
gameboard.placeShips(['battleship', 'TUG'])
gameboard.render()

