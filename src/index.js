import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'

import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'

const sagaErrorHandler = (err, obj) => {
  console.log('SAGA ERROR', err, obj)
}

// *** Redux ***

const sagaMiddleware = createSagaMiddleware({onError: sagaErrorHandler})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

//

function render() {
  ReactDOM.render(  
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

render()
store.subscribe(render)
