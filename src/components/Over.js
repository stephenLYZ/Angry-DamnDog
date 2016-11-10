import React,{ Component } from 'react'

export default class Over extends Component{
  render(){
    const { score,onStart } = this.props
    return (
      <div className="over">
        <div className="over-board">
          <h3 className="over-text">你拆散了<span>{score}</span>对情侣</h3>
          <a className="again" onClick={onStart}></a>
          <a className="link" href="http://h5.muxixyz.com/1111/more/"></a>
        </div>
      </div>
    )
  }
}
