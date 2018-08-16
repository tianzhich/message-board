import React from 'react'
import ReactDom from 'react-dom'
import App from './containers/App'
import { Provider } from 'react-redux'
import rootReducer from "./reducers"
import { createStore } from 'redux'

const store = createStore(rootReducer);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)