import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, GET_PRODUCTS } from './types';

export const registerProduct = (productData, history) => (dispatch) => {
  axios.post('/api/products/create', productData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const updateProduct = (updatedProduct, history) => (dispatch) => {
  axios.put('/api/products/update', updatedProduct)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const setAllProducts = (products) => {
  // console.log(products);
  return {
    type: GET_PRODUCTS,
    payload: products,
  };
};

export const getAllProducts = () => (dispatch) => {
  axios.get('/api/products/all')
    .then((res) => {
      dispatch(setAllProducts(res.data));
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const deleteProduct = (productToDeleteId, history) => (dispatch) => {
  axios.delete(`/api/products/delete/${productToDeleteId}`)
    .then(() => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

export const removeAllProducts = () => (dispatch) => {
  dispatch(setAllProducts({}));
};
