import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createAnecdote } from './reducers/anecdoteReducer'

import store from './store'
//Reducerit
import App from './App'



store.subscribe(() => console.log(store.getState()))
store.dispatch(createAnecdote('combineReducers forms one reduces from many simple reducers'))



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
