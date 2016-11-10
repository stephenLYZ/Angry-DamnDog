import React,{ Component } from 'react'
import Guy from './Guy'
import TopBoard from './TopBoard'

export default class GameBoard extends Component{
  render(){
    const { guys,onGuysClick,score,time,gameState } = this.props

    return (
      <div className="game-board">
        <TopBoard score={score} time={time} />
        <div className="board">
          {guys.map((guy) =>
            <Guy key={guy.index}
                 guyState={guy.guyState}
                 onGuysClick={onGuysClick(guy.index)} />
          )}
        </div>
      </div>
    )
  }
}
