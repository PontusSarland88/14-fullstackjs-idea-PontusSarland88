import React from 'react';
import ReactDOM from 'react-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { removeAllProducts } from './actions/productActions';

// checkForToken
if(localStorage.jwtToken) {
  // Set the auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticatad
  store.dispatch(setCurrentUser(decoded));
  // Check if token has expired
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // TODO: clear current profile.
    // TODO: Clear all redux data.
    store.dispatch(removeAllProducts());
    window.location.href = '/login';
  }
}

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
