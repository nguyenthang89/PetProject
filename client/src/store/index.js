import { authReducer } from './auth';
import { userReducer } from './user';
import thunk from 'redux-thunk';
import { combineReducers, compose, createStore, applyMiddleware  } from 'redux';
import { restClient } from '../core';

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development' && !!window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

export default createStore(
  combineReducers({
    auth: authReducer,
    users: userReducer,
  }),
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ 
      $http: restClient
    }))
  )
);