import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import './bootstrap/css/bootstrap.css'
import './index.css'
import App from './App'
import reducers from './reducers'

const logger = createLogger({});

const middlewares = [thunk, logger]

const store = createStore(
  reducers,
  applyMiddleware(...middlewares)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
