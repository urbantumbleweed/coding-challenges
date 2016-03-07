import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
const GoogleLoader = require('google-maps'); //load googlemaps into the global namespace
import App from './containers/App'
import configureStore from './store/configureStore'
import './styles.css'
// import 'todomvc-app-css/index.css' //create custom npm module for truckLoc-app-css styles

GoogleLoader.load();

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
