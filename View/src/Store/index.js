import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { rootReducer } from '../reducers/'

//import { api, paypal, business } from '../middleware';

var appWorkchewReduxStateKey = "appWorkchewReduxState"

// const enhancer = compose(
//   applyMiddleware(thunk, api, paypal, business, createLogger()),
// )

const enhancer = compose(
  applyMiddleware(thunk, createLogger()),
)

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    // preloadedState,
    //  enhancer

  )

  return store
}

var preloadedState = {

}

var StoredState = localStorage.getItem(appWorkchewReduxStateKey) || JSON.stringify(preloadedState);

preloadedState = JSON.parse(StoredState)
console.log(' preloadedState ', preloadedState)

export const store = configureStore(preloadedState);

store.subscribe(() => {

  localStorage.setItem(appWorkchewReduxStateKey, JSON.stringify(store.getState()))

})