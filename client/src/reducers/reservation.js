import {
  OPEN_NEW_RESERVATION,
  LOADED_TABLE_RESERVATIONS,
  START_LOADING_TABLE_RESERVATIONS,
} from '../actions/types';

const initialState = {
  tableReservations: [],
  loadingTableReservations: true,
};

function reservationReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case OPEN_NEW_RESERVATION:
    case LOADED_TABLE_RESERVATIONS:
      return {
        ...state,
        tableReservations: payload,
        loadingTableReservations: false,
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
