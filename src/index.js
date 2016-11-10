import React from 'react'
import { render } from 'react-dom'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'

import reducers from './reducers'

import App from './components/App'
// import store from './stores/index'
// import { gameLength,roundLength,guysPerRoundLow,guysPerRoundHigh,guyOutLengthLow,guyOutLengthHigh } from './constants'

import './styles/main.scss'

const gameLength = 30000,
      roundLength = 1000,
      guysPerRoundLow =  1,
      guysPerRoundHigh = 2,
      guyOutLengthLow =  1500,
      guyOutLengthHigh = 2500


const initialState = Immutable({
      gameState: 'unstarted',
      guys: _.times(9, i => ({
          index: i,
          guyState: 'in'
        })),
        gameLength
      })

const logger = createLogger()
const store = createStore(reducers,initialState,applyMiddleware(thunk, promise, logger))

store.subscribe(renderGame)

renderGame()

function renderGame(){
  render(
    <App
      state={store.getState()}
      onStart={startGame}
      onGuysClick={onGuysClick}
    />,
  document.getElementById('root'))
}

function startGame(){
  const gameState = store.getState().gameState
  const audio = document.getElementById('wang')

  if(gameState !== 'started'){
    audio.loop = true
    audio.play()
    store.dispatch({ type: 'GAMESTATE_START' })

    const clockInterval = setInterval(() => {
      store.dispatch({ type: 'TICK' })
    },1000)

    const roundsInterval = setInterval(triggerRound,roundLength)

    setTimeout(() => {
      clearInterval(clockInterval)
      clearInterval(roundsInterval)
      store.dispatch({ type: 'GAMESTATE_END' })
      audio.pause()
    },gameLength)
  }
}

function triggerRound(){
  const guys = store.getState().guys,
        guysIn = _.filter(guys,guy => guy.guyState === 'in'),
        guysIndex = _.map(guysIn,guy => guy.index),
        guyRound = _.random(guysPerRoundLow,guysPerRoundHigh)

  _.sampleSize(guysIndex,guyRound).forEach(triggerGuy)

  function triggerGuy(index){
    const guyOutLength = _.random(guyOutLengthLow,guyOutLengthHigh)

    store.dispatch({ type: 'GUY_OUT',index })

    setTimeout(() => {
      store.dispatch({ type: 'GUY_IN',index })
    },guyOutLength)
  }
}

function onGuysClick(index){
  const audio = document.getElementById('heartbreak')
  return function(event){
    if(store.getState().guys[index].guyState === 'out'){
      audio.play()
      store.dispatch({ type: 'GUY_HIT',index })
    }
  }
}
