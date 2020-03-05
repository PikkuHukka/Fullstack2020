import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  notification: notificationReducer,
  users: userReducer
})

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store