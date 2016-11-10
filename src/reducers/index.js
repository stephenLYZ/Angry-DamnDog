export default function reducer(state,action){
  switch(action.type){
    case 'GAMESTATE_START':
      return state
        .set('gameState','started')
        .set('score',0)
        .set('time',state.gameLength)
        .set('guys',state.guys.map(guy => guy.set('guyState','in')))

    case 'TICK':
      return state.update('time',time => time - 1000)

    case 'GAMESTATE_END':
      return state
        .set('gameState','gameover')
        .set('guys',state.guys.map(guy => guy.set('guyState','in')))

    case 'GUY_OUT':
      return state.setIn(['guys',action.index,'guyState'],'out')

    case 'GUY_IN':
      return state.setIn(['guys',action.index,'guyState'],'in')

    case 'GUY_HIT':
      return state
        .setIn(['guys',action.index,'guyState'],'hit')
        .update('score',score => score + 1)

    default:
      return state

  }
}
