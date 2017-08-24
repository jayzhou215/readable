import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import root_reducer from './root_reducer'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import CategoryView from './components/CategoryView'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const store = createStore(root_reducer,
  composeEnhancers(
    applyMiddleware(logger, thunk)
  ))

ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

  , document.getElementById('root'));
// registerServiceWorker();
