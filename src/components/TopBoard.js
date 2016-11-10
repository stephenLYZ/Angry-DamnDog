import React,{ Component } from 'react'

export default class TopBoard extends Component{
  render(){
      const { score,time } = this.props
      const date = new Date(time),
            format = time => time < 10 ? '0' + time : time,
            seconds = format(date.getSeconds())
      return (
        <div className="top-board">
          <div className="time">
            {seconds}
          </div>
          <div className="score">
            HITS: {score}
          </div>
        </div>
      )
  }
}
