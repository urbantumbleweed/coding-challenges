'use strict';

import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import rootReducer from '../reducers'; //includes trucks, user, search, activeTruck, view, map

// Let'd decorate the createStore with middleware to handle async
const storeWithMiddleware = compose(
  applyMiddleware(thunk),
  applyMiddleware(createLogger()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
  // create the application state and make available to redux dev tools if dev tools are being used.
  // const store = ( window.devToolsExtension ? window.devToolsExtension()(storeWithMiddleware) : storeWithMiddleware)(rootReducer, initialState);
  const store = storeWithMiddleware(rootReducer, initialState);

  // if hot reloading is enable,
  // changes in code will update the application without losing application state.
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer)
    })
  }

  return store;
}
