import React,{ Component } from 'react'

export default class Guy extends Component{
  render(){
    const { guyState,onGuysClick } = this.props

    return (
      <div className="hole" onClick={onGuysClick}>
        <img className={getGuyClass(guyState)} src='https://occc3ev3l.qnssl.com//11/guys.png' />
        <img className={getHurtClass(guyState)}  src='https://occc3ev3l.qnssl.com//11/hurt.png' />
      </div>
    )
  }
}


function getHurtClass(guyState){
  const hurtClass =
    guyState === 'hit' ? 'guy-hit' : 'hide'
  return `guy ${hurtClass}`
}

function getGuyClass(guyState){
  const guyClass =
    guyState === 'out' ? 'pop-out' : 'hide'
  return `guy ${guyClass}`
}
