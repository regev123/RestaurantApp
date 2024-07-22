import {
  FAILED_TO_ADD_TABLE,
  FAILED_TO_DELETE_TABLE,
  FAILED_TO_LOAD_TABLES,
  TABLES_LOADED,
  TABLE_ADDED,
  TABLE_DELETED,
  START_LOADING,
} from '../actions/types';

const initialState = {
  loading: true,
  tables: null,
};

function tableReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TABLES_LOADED:
    case TABLE_DELETED:
    case TABLE_ADDED:
      return {
        ...state,
        loading: false,
        tables: payload,
      };
    case FAILED_TO_LOAD_TABLES:
    case FAILED_TO_DELETE_TABLE:
    case FAILED_TO_ADD_TABLE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default tableReducer;
