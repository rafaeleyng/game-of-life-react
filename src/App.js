import React, { Component } from 'react'
import './App.css'
import _ from 'lodash'
import lif from 'lif'
import Cell from './Cell'

class App extends Component {
  constructor() {
    super()

    const width = 16
    const height = 16

    const initEmptyBoard = (width, height) => {
      const board = []
      for (var i = 0; i < width * height; ++i) { board[i] = false }
      return board
    }

    const board = initEmptyBoard(width, height)

    this.state = {
      interval: 100,
      width,
      height,
      board,
      gameState: 'stoped',
    }

    // bind
    this.applyRules = this.applyRules.bind(this)
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
  }

  applyRules() {
    this.setState({ board: lif(this.state.board) })
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
