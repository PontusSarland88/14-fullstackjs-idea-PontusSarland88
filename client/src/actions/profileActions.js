import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from './types';

// Get current profle
const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios.get('/api/users/current')
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err,
    }));
};

const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export default setProfileLoading();
