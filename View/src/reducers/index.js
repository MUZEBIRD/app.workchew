import { combineReducers } from 'redux'
//import { routerReducer } from 'react-router-redux'

//import { business } from '../Components/Business/reducers'
import { partners } from '../Components/Partner/reducers'
import { users } from '../Components/Public/reducers'

const appReducer = combineReducers({
  partners,
  users
//business,
// routing: routerReducer
})

export const rootReducer = (state, action) => {
  console.log('@ root recuer', state, action)
  return appReducer(state, action)
}