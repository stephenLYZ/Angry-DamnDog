import React,{ Component } from 'react'

export default class Home extends Component{
  render(){
    const { onStart } = this.props
    return (
      <div className="Home">
         <div className="animation">
           <div className="boy"></div>
           <div className="title"></div>
           <div className="girl"></div>
         </div>
         <div className="singleButton" onClick={onStart}></div>
      </div>
    )
  }
}
