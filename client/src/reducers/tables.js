import {
  TABLES_LOADED,
  TABLE_ADDED,
  TABLE_DELETED,
  START_LOADING,
} from '../actions/types';

const initialState = {
  loading: true,
  tables: [],
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
    default:
      return {
        ...state,
        loading: false,
      };
  }
}

export default tableReducer;
