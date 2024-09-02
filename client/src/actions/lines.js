import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_ALL_LINES,
  START_LOADING_LINES,
  NEW_LINE_ADDED,
  DELETE_EXISTING_LINE,
  ADDED_MENU_ITEM_TO_LINE,
  DELETE_MENU_ITEM_FROM_LINE,
} from './types';

export const getAllLines = () => async (dispatch) => {
  try {
    dispatch({
      type: START_LOADING_LINES,
    });

    const res = await api.get('/lines/getLines');

    dispatch({
      type: GET_ALL_LINES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert('Failed creating reservation', error.msg, 'error'));
      });
    }
  }
};

export const addLine = (name) => async (dispatch) => {
  const body = { name };
  try {
    dispatch({
      type: START_LOADING_LINES,
    });
    const res = await api.post('/lines/addLine', body);

    dispatch({
      type: NEW_LINE_ADDED,
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

export const deleteLine = (id) => async (dispatch) => {
  try {
    dispatch({
      type: START_LOADING_LINES,
    });

    const res = await api.delete(`/lines/deleteLine/${id}`);

    dispatch({
      type: DELETE_EXISTING_LINE,
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

export const addMenuItemToLine = (line, item) => async (dispatch) => {
  try {
    dispatch({
      type: START_LOADING_LINES,
    });

    const body = { line, item };

    const res = await api.post(`/lines/addMenuItemToLine`, body);

    dispatch({
      type: ADDED_MENU_ITEM_TO_LINE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(
          setAlert('Failed adding menu item to line', error.msg, 'error')
        );
      });
    }
  }
};

export const DeleteMenuItemFromLine = (lineId, itemId) => async (dispatch) => {
  try {
    dispatch({
      type: START_LOADING_LINES,
    });

    const res = await api.delete(
      `/lines/deleteMenuItemFromLine/${lineId}/${itemId}`
    );

    dispatch({
      type: DELETE_MENU_ITEM_FROM_LINE,
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
