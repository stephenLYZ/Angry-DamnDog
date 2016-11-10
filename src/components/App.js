import React, { Component } from 'react'
import Home from './Home'
import GameBoard from './GameBoard'
import Over from './Over'

export default class App extends Component {
  render() {
    const { state,onStart,onGuysClick } = this.props
    const { guys,gameState,score,time } = state

    return (
      <div className="container">
        {
          gameState === 'unstarted' ?
            <Home onStart={onStart} />
          : gameState === 'started' ?
            <GameBoard
              guys={guys}
              onGuysClick={onGuysClick}
              score={score}
              time={time}
              gameState={gameState}
            />
          : gameState === 'gameover' ?
            <Over score={score} onStart={onStart} />
          : null
        }
      </div>
    )
  }
}
