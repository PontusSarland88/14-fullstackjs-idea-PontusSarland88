import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, GET_USERS } from './types';

export const addUser = (userData, history) => (dispatch) => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const updateUser = (updatedUser, history) => (dispatch) => {
  axios.put(`/api/users/update/${updatedUser.id}`, updatedUser)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const setAllUsers = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

export const getAllUsers = () => (dispatch) => {
  axios.get('/api/users/all')
    .then((res) => {
      dispatch(setAllUsers(res.data));
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const deleteUser = (userToDeleteId, history) => (dispatch) => {
  axios.delete(`/api/users/delete/${userToDeleteId}`)
    .then(() => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

// export const removeAllProducts = () => (dispatch) => {
//   dispatch(setAllProducts({}));
// };
