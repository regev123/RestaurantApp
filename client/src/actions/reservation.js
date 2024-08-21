import api from '../utils/api';
import { setAlert } from './alert';
import {
  OPEN_NEW_RESERVATION,
  LOADED_TABLE_RESERVATIONS,
  START_LOADING_TABLE_RESERVATIONS,
} from './types';

export const OpenNewReservation = (menuItems, tableId) => async (dispatch) => {
  try {
    dispatch({
      type: START_LOADING_TABLE_RESERVATIONS,
    });
    const body = { tableId, menuItems };

    const res = await api.post('/reservation/openNewReservation', body);

    dispatch({
      type: OPEN_NEW_RESERVATION,
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

export const getReservationsOfTable = (tableId) => async (dispatch) => {
  try {
    const res = await api.get(
      `/reservation/getTableReservationsList/${tableId}`
    );

    dispatch({
      type: LOADED_TABLE_RESERVATIONS,
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
