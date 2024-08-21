import api from '../utils/api';
import { setAlert } from './alert';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  SIGNIN_FAIL,
  SIGNIN_SUCCESS,
  LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await api.get('/auth/getUser');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const signUp =
  ({ name, email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await api.post('/users/register', body);

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert('Register Failed', error.msg, 'error'));
        });
      }
      dispatch({ type: SIGNUP_FAIL });
    }
  };

// Login User
export const signIn = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth/login', body);

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert('Login Failed', error.msg, 'error'));
      });
    }
    dispatch({ type: SIGNIN_FAIL });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
