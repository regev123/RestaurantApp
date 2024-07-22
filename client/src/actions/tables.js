import api from '../utils/api';
import { setAlert } from './alert';
import {
  TABLES_LOADED,
  FAILED_TO_LOAD_TABLES,
  TABLE_DELETED,
  FAILED_TO_DELETE_TABLE,
  TABLE_ADDED,
  FAILED_TO_ADD_TABLE,
  START_LOADING,
} from './types';
// import setAuthToken from '../utils/setAuthToken';

// Load Tables
export const loadTables = () => async (dispatch) => {
  try {
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
    dispatch({
      type: FAILED_TO_LOAD_TABLES,
    });
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

      dispatch({
        type: FAILED_TO_DELETE_TABLE,
      });
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

    dispatch({
      type: FAILED_TO_ADD_TABLE,
    });
  }
};
