import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import productsReducer from './productsReducer';
import usersReducer from './usersReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  products: productsReducer,
  users: usersReducer,
  orders: orderReducer,
});
