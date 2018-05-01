import { combineReducers } from 'redux'
//import { routerReducer } from 'react-router-redux'

//import { business } from '../Components/Business/reducers'
//mport { user } from './user'

const appReducer = combineReducers({
  //user,
  //business,
  // routing: routerReducer
})

export const rootReducer = (state, action) => {
  console.log('@ root recuer', state, action)
  return appReducer(state, action)
}