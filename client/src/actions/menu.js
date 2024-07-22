import api from '../utils/api';
import { setAlert } from './alert';
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
} from './types';
// import setAuthToken from '../utils/setAuthToken';

// Load Menu Items
export const loadMenuItems = () => async (dispatch) => {
  try {
    const res = await api.get('/menu/getMenuItems');

    dispatch({
      type: MENU_ITEMS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'error'));
      });
    }
    dispatch({
      type: FAILED_TO_LOAD_MENU_ITEMS,
    });
  }
};

// Load Menu Item Categories
export const loadMenuItemCategories = () => async (dispatch) => {
  try {
    const res = await api.get('/menu/getMenuItemCategories');

    dispatch({
      type: MENU_ITEM_CATEGORIES_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'error'));
      });
    }
    dispatch({
      type: FAILED_TO_LOAD_MENU_ITEM_CATEGORIES,
    });
  }
};

// Delete Menu Item
export const deleteMenuItem =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const res = await api.delete(`/menu/deleteMenuItem/${id}`);

      dispatch({
        type: DELETE_MENU_ITEM,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'error'));
        });
      }
      dispatch({
        type: FAILED_TO_DELETE_MENU_ITEM,
      });
    }
  };

//Add Menu Item
export const addMenuItem =
  (name, price, ingredients, category, imageUrl) => async (dispatch) => {
    const body = { name, price, ingredients, category, imageUrl };
    try {
      dispatch({ type: START_LOADING });
      const res = await api.post('/menu/addMenuItem', body);

      dispatch({
        type: ADDED_MENU_ITEM,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'error'));
        });
      }
      dispatch({
        type: FAILED_TO_ADD_MENU_ITEM,
      });
    }
  };

// Add Wanted Edit Menu Item To State
export const addWantedEditMenuItemToState =
  (name, price, ingredients, category, imageUrl) => async (dispatch) => {
    dispatch({
      type: ADD_WANTED_EDIT_MENU_ITEM_IN_STATE,
      payload: {
        name,
        price,
        ingredients,
        category,
        imageUrl,
      },
    });
  };

export const editMenuItem =
  (name, price, ingredients, category, imageUrl) => async (dispatch) => {
    const body = { name, price, ingredients, category, imageUrl };
    try {
      dispatch({ type: START_LOADING });
      const res = await api.put('/menu/updateMenuItem', body);

      dispatch({
        type: EDIT_MENU_ITEM,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'error'));
        });
      }
      dispatch({
        type: FAILED_TO_EDIT_MENU_ITEM,
      });
    }
  };

export const addMenuItemCategory = (name, order) => async (dispatch) => {
  const body = { name, order };

  try {
    const res = await api.post('/menu/addMenuItemCategory', body);

    dispatch({
      type: ADDED_MENU_ITEM_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'error'));
      });
    }
    dispatch({
      type: FAILED_TO_ADD_MENU_ITEM_CATEGORY,
    });
  }
};

export const deleteMenuItemCategory =
  ({ id }) =>
  async (dispatch) => {
    try {
      const res = await api.delete(`/menu/deleteMenuItemCategory/${id}`);

      dispatch({
        type: DELETE_MENU_ITEM_CATEGORY,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'error'));
        });
      }
      dispatch({
        type: FAILED_TO_DELETE_MENU_ITEM_CATEGORY,
      });
    }
  };

export const changeOrderMenuItemCategories =
  (categories) => async (dispatch) => {
    try {
      const res = await api.post(
        `/menu/changeOrderMenuItemCategories`,
        categories
      );

      dispatch({
        type: CHANGE_MENU_ITEM_CATEGORIES_ORDER,
        payload: res.data,
      });
      dispatch(setAlert('Order changed successfully', 'success'));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'error'));
        });
      }
      dispatch({
        type: FAILED_TO_CHANGE_MENU_ITEM_CATEGORIES_ORDER,
      });
    }
  };
