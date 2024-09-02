import api from '../utils/api';
import { setAlert } from './alert';
import {
  OPEN_NEW_RESERVATION,
  LOADED_TABLE_RESERVATIONS,
  START_LOADING_TABLE_RESERVATIONS,
  REMOVE_HOLD_FROM_RESERVATION_ITEM,
  DELETE_ITEM_FROM_RESERVATION,
  CLOSE_RESERVATION_ITEM,
  LOADED_RESERVATIONS,
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
    return true;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert('Failed creating reservation', error.msg, 'error'));
      });
    }
  }
};

export const getReservations = () => async (dispatch) => {
  try {
    const res = await api.get(`/reservation/getReservations`);

    dispatch({
      type: LOADED_RESERVATIONS,
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

export const removeHold = (reservationId, itemId) => async (dispatch) => {
  try {
    dispatch({
      type: START_LOADING_TABLE_RESERVATIONS,
    });
    const body = { reservationId, itemId };

    const res = await api.post('/reservation/removeHold', body);

    dispatch({
      type: REMOVE_HOLD_FROM_RESERVATION_ITEM,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(
          setAlert(
            'Failed remove hold from reservation item',
            error.msg,
            'error'
          )
        );
      });
    }
  }
};

export const deleteItem = (reservationId, itemId) => async (dispatch) => {
  try {
    dispatch({
      type: START_LOADING_TABLE_RESERVATIONS,
    });
    const body = { reservationId, itemId };

    const res = await api.post('/reservation/deleteItem', body);

    dispatch({
      type: DELETE_ITEM_FROM_RESERVATION,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(
          setAlert('Failed to delete a reservation item', error.msg, 'error')
        );
      });
    }
  }
};

export const setItemAsClose = (reservationId, itemId) => async (dispatch) => {
  try {
    dispatch({
      type: START_LOADING_TABLE_RESERVATIONS,
    });
    const body = { reservationId, itemId };

    const res = await api.post('/reservation/setItemAsClose', body);

    dispatch({
      type: CLOSE_RESERVATION_ITEM,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(
          setAlert('Failed to delete a reservation item', error.msg, 'error')
        );
      });
    }
  }
};
