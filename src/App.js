import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'
import Cell from './Cell'

class App extends Component {
  constructor() {
    super()

    const width = 16
    const height = 16
    const board = this.initEmptyBoard(width, height)

    this.state = {
      interval: 100,
      width,
      height,
      board,
      gameState: 'stoped',
    }

    // bind
    this.initEmptyBoard = this.initEmptyBoard.bind(this)
    this.applyRules = this.applyRules.bind(this)
    this.findNeighbors = this.findNeighbors.bind(this)
    this.wrapRow = this.wrapRow.bind(this)
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
  }

  initEmptyBoard(width, height) {
    const board = []
    for (var i = 0; i < width * height; ++i) { board[i] = false }
    return board
  }

  wrapRow(value) {
    const m = this.state.width * this.state.height
    return (value + m) % (this.state.width * this.state.height)
  }

  findNeighbor1(index) {
    const isLeftmost = index % this.state.width === 0
    let compensation = 0
    if (isLeftmost) {
      compensation = this.state.width
    }

    const value = index - this.state.width - 1
    return this.wrapRow(value + compensation)
  }

  findNeighbor2(index) {
    const value = index - this.state.width
    return this.wrapRow(value)
  }

  findNeighbor3(index) {
    const isRightmost = index % this.state.width === (this.state.width - 1)
    let compensation = 0
    if (isRightmost) {
      compensation = this.state.width
    }

    const value = index - this.state.width + 1
    return this.wrapRow(value - compensation)
  }

  findNeighbor4(index) {
    const isLeftmost = index % this.state.width === 0
    let compensation = 0
    if (isLeftmost) {
      compensation = this.state.width
    }
    return index - 1 + compensation
  }

  findNeighbor5(index) {
    const isRightmost = index % this.state.width === (this.state.width - 1)
    let compensation = 0
    if (isRightmost) {
      compensation = this.state.width
    }
    return index + 1 - compensation
  }

  findNeighbor6(index) {
    const isLeftmost = index % this.state.width === 0
    let compensation = 0
    if (isLeftmost) {
      compensation = this.state.width
    }

    const value = index + this.state.width - 1
    return this.wrapRow(value + compensation)
  }

  findNeighbor7(index) {
    const value = index + this.state.width
    return this.wrapRow(value)
  }

  findNeighbor8(index) {
    const isRightmost = index % this.state.width === (this.state.width - 1)
    let compensation = 0
    if (isRightmost) {
      compensation = this.state.width
    }
    const value = index + this.state.width + 1
    return this.wrapRow(value - compensation)
  }

  findNeighbors(index) {
    return [
      this.findNeighbor1(index),
      this.findNeighbor2(index),
      this.findNeighbor3(index),
      this.findNeighbor4(index),
      this.findNeighbor5(index),
      this.findNeighbor6(index),
      this.findNeighbor7(index),
      this.findNeighbor8(index),
    ]
  }

  applyRules() {
    const board = this.initEmptyBoard(this.state.width, this.state.height)
    this.state.board.forEach((isAlive, i) => {
      const neighborIndexes = this.findNeighbors(i)
      const neighborStatuses = neighborIndexes.map(ni => this.state.board[ni])
      const aliveNeighbors = neighborStatuses.filter(e => e).length

      // rules
      if (!isAlive && aliveNeighbors === 3) {
        board[i] = true
      } else if (isAlive && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
        board[i] = true
      } else if (isAlive && aliveNeighbors < 2) {
        board[i] = false
      } else if (isAlive && aliveNeighbors > 3) {
        board[i] = false
      }
    })
    this.setState({board})
  }

  play() {
    const intervalId = setInterval(this.applyRules, this.state.interval)

    this.setState({
      intervalId,
      gameState: 'playing',
    })
  }

  stop() {
    clearInterval(this.state.intervalId)
    this.setState({
      intervalId: undefined,
      gameState: 'stoped',
    })
  }

  handleCellClick(index) {
    if (this.state.gameState === 'stoped') {
      const board = this.state.board
      board[index] = !board[index]
      this.setState({board})
    }
  }

  render() {
    const listCell = (
      <div className="App-list-cell">
        {
          _.times(this.state.width, i => {
            return (
              <div key={i} className="App-row">
                {
                  _.times(this.state.height, j => {
                    const index = i * this.state.width + j
                    return (<Cell click={this.handleCellClick} key={index} index={index} alive={this.state.board[index]} />)
                  })
                }
              </div>
            )
          })
        }
      </div>
    )

    return (
      <div className="App">
        {this.state.gameState === 'stoped' ? <button onClick={this.play}>Play</button> : <button onClick={this.stop}>Stop</button>}
        {listCell}
      </div>
    );
  }
}

export default App;
