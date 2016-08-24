import React, { Component } from 'react'
import './App.css'
import Cell from './Cell'
import _ from 'lodash'

class App extends Component {
  constructor() {
    super()

    const width = 16
    const height = 16
    const board = []
    for (var i = 0; i < width * height; ++i) { board[i] = false }

    this.state = {
      width,
      height,
      board,
    }

    // bind
    this.handleCellClick = this.handleCellClick.bind(this)
  }

  handleCellClick(index) {
    const board = this.state.board
    board[index] = !board[index]
    this.setState({board})
  }

  render() {
    const listCell = (
      <div>
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
        {listCell}
      </div>
    );
  }
}

export default App;
