import {
  MENU_ITEMS_LOADED,
  FAILED_TO_LOAD_MENU_ITEMS,
  START_LOADING,
  DELETE_MENU_ITEM,
  FAILED_TO_DELETE_MENU_ITEM,
  MENU_ITEM_CATEGORIES_LOADED,
  FAILED_TO_LOAD_MENU_ITEM_CATEGORIES,
  ADDED_MENU_ITEM,
  FAILED_TO_ADD_MENU_ITEM,
  ADD_WANTED_EDIT_MENU_ITEM_IN_STATE,
  EDIT_MENU_ITEM,
  FAILED_TO_EDIT_MENU_ITEM,
  ADDED_MENU_ITEM_CATEGORY,
  FAILED_TO_ADD_MENU_ITEM_CATEGORY,
  DELETE_MENU_ITEM_CATEGORY,
  FAILED_TO_DELETE_MENU_ITEM_CATEGORY,
  CHANGE_MENU_ITEM_CATEGORIES_ORDER,
  FAILED_TO_CHANGE_MENU_ITEM_CATEGORIES_ORDER,
} from '../actions/types';

const initialState = {
  loading: false,
  menuItems: null,
  menuItemCategories: null,
  loadingCategories: true,
  loadingMenuItems: true,
  wantedEditMenuItem: null,
};

function tableReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MENU_ITEMS_LOADED:
      return {
        ...state,
        loadingMenuItems: false,
        menuItems: payload,
      };
    case MENU_ITEM_CATEGORIES_LOADED:
    case ADDED_MENU_ITEM_CATEGORY:
    case DELETE_MENU_ITEM_CATEGORY:
    case CHANGE_MENU_ITEM_CATEGORIES_ORDER:
      return {
        ...state,
        loadingCategories: false,
        menuItemCategories: payload,
      };
    case ADD_WANTED_EDIT_MENU_ITEM_IN_STATE:
      return {
        ...state,
        wantedEditMenuItem: payload,
      };
    case DELETE_MENU_ITEM:
    case ADDED_MENU_ITEM:
    case EDIT_MENU_ITEM:
      return {
        ...state,
        loading: false,
        menuItems: payload,
      };
    case FAILED_TO_ADD_MENU_ITEM:
    case FAILED_TO_LOAD_MENU_ITEMS:
    case FAILED_TO_DELETE_MENU_ITEM:
    case FAILED_TO_LOAD_MENU_ITEM_CATEGORIES:
    case FAILED_TO_EDIT_MENU_ITEM:
    case FAILED_TO_ADD_MENU_ITEM_CATEGORY:
    case FAILED_TO_DELETE_MENU_ITEM_CATEGORY:
    case FAILED_TO_CHANGE_MENU_ITEM_CATEGORIES_ORDER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default tableReducer;
