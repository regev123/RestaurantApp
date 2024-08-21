import {
  MENU_ITEMS_LOADED,
  START_LOADING,
  DELETE_MENU_ITEM,
  MENU_ITEM_CATEGORIES_LOADED,
  ADDED_MENU_ITEM,
  EDIT_MENU_ITEM,
  ADDED_MENU_ITEM_CATEGORY,
  DELETE_MENU_ITEM_CATEGORY,
  CHANGE_MENU_ITEM_CATEGORIES_ORDER,
  CLOSE_OR_OPEN_MENU_ITEM,
  START_LOADING_MENU_ITEMS,
  START_LOADING_CATEGORIES,
  FINISH_LOADING_MENU_ITEMS,
} from '../actions/types';

const initialState = {
  loading: false,
  menuItems: [],
  menuItemCategories: [],
  loadingCategories: true,
  loadingMenuItems: true,
};

function tableReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case START_LOADING_MENU_ITEMS:
      return {
        ...state,
        loadingMenuItems: true,
      };
    case START_LOADING_CATEGORIES:
      return {
        ...state,
        loadingCategories: true,
      };
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
    case CHANGE_MENU_ITEM_CATEGORIES_ORDER:
      return {
        ...state,
        loading: false,
        loadingCategories: false,
        menuItemCategories: payload,
      };
    case DELETE_MENU_ITEM_CATEGORY:
      return {
        ...state,
        loadingCategories: false,
        menuItemCategories: payload.categoriesData,
        menuItems: payload.menuItemsData,
      };
    case DELETE_MENU_ITEM:
    case ADDED_MENU_ITEM:
    case EDIT_MENU_ITEM:
    case CLOSE_OR_OPEN_MENU_ITEM:
      return {
        ...state,
        loadingMenuItems: false,
        menuItems: payload,
        wantedEditMenuItem: null,
      };
    case FINISH_LOADING_MENU_ITEMS:
      return {
        ...state,
        loadingMenuItems: false,
      };
    default:
      return {
        ...state,
        loading: false,
      };
  }
}

export default tableReducer;
