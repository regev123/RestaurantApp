import {
  OPEN_NEW_RESERVATION,
  LOADED_TABLE_RESERVATIONS,
  START_LOADING_TABLE_RESERVATIONS,
  REMOVE_HOLD_FROM_RESERVATION_ITEM,
  DELETE_ITEM_FROM_RESERVATION,
  CLOSE_RESERVATION_ITEM,
  LOADED_RESERVATIONS,
} from '../actions/types';

const initialState = {
  tableReservations: [],
  reservations: [],
  loadingTableReservations: true,
  loadingReservations: true,
};

function reservationReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case OPEN_NEW_RESERVATION:
    case LOADED_TABLE_RESERVATIONS:
    case REMOVE_HOLD_FROM_RESERVATION_ITEM:
    case DELETE_ITEM_FROM_RESERVATION:
    case CLOSE_RESERVATION_ITEM:
      return {
        ...state,
        tableReservations: payload,
        loadingTableReservations: false,
      };
    case LOADED_RESERVATIONS:
      return {
        ...state,
        reservations: payload,
        loadingReservations: false,
      };
    case START_LOADING_TABLE_RESERVATIONS:
      return {
        ...state,
        loadingTableReservations: true,
      };
    default:
      return {
        ...state,
        loadingTableReservations: false,
      };
  }
}

export default reservationReducer;
