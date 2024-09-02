import {
  GET_ALL_LINES,
  START_LOADING_LINES,
  NEW_LINE_ADDED,
  DELETE_EXISTING_LINE,
  ADDED_MENU_ITEM_TO_LINE,
  DELETE_MENU_ITEM_FROM_LINE,
} from '../actions/types';

const initialState = {
  lines: [],
  loadingLines: true,
};

function reservationReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_LINES:
    case NEW_LINE_ADDED:
    case DELETE_EXISTING_LINE:
    case ADDED_MENU_ITEM_TO_LINE:
    case DELETE_MENU_ITEM_FROM_LINE:
      return {
        ...state,
        lines: payload,
        loadingLines: false,
      };
    case START_LOADING_LINES:
      return {
        ...state,
        loadingLines: true,
      };
    default:
      return {
        ...state,
        loadingLines: false,
      };
  }
}

export default reservationReducer;
