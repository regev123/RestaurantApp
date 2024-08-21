import api from '../utils/api';
import { setAlert } from './alert';
import {
  TABLES_LOADED,
  TABLE_DELETED,
  TABLE_ADDED,
  START_LOADING,
} from './types';
// import setAuthToken from '../utils/setAuthToken';

// Load Tables
export const loadTables = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const res = await api.get('/tables/getTables');

    dispatch({
      type: TABLES_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'error'));
      });
    }
  }
};

export const deleteTable =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: START_LOADING,
      });
      const res = await api.delete(`/tables/deleteTable/${id}`);

      dispatch({
        type: TABLE_DELETED,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'error'));
        });
      }
    }
  };

export const addTable = (seats) => async (dispatch) => {
  const body = { seats };
  try {
    dispatch({
      type: START_LOADING,
    });
    const res = await api.post('/tables/addTable', body);

    dispatch({
      type: TABLE_ADDED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'error'));
      });
    }
  }
};
