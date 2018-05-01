import { combineReducers } from 'redux'
//import { routerReducer } from 'react-router-redux'

//import { business } from '../Components/Business/reducers'
import { partners } from '../Components/Partner/reducers'




const appReducer = combineReducers({
  partners,
//business,
// routing: routerReducer
})

export const rootReducer = (state, action) => {
  console.log('@ root recuer', state, action)
  return appReducer(state, action)
}