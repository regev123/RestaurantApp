import api from '../utils/api';
import { setAlert } from './alert';
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
  FINISH_LOADING_MENU_ITEMS,
  START_LOADING_CATEGORIES,
} from './types';

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
  }
};

// Delete Menu Item
export const deleteMenuItem =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_MENU_ITEMS });
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
    }
  };

//Add Menu Item
export const addMenuItem =
  (name, price, ingredients, category, imageUrl) => async (dispatch) => {
    const body = { name, price, ingredients, category, imageUrl };
    try {
      dispatch({ type: START_LOADING_MENU_ITEMS });

      const res = await api.post('/menu/addMenuItem', body);

      dispatch({
        type: ADDED_MENU_ITEM,
        payload: res.data,
      });

      return true;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        dispatch({
          type: FINISH_LOADING_MENU_ITEMS,
        });
        errors.forEach((error) => {
          dispatch(setAlert('Add menu item failed!', error.msg, 'error'));
        });
      }
      return false;
    }
  };

export const editMenuItem =
  (name, price, ingredients, category, imageUrl) => async (dispatch) => {
    const body = { name, price, ingredients, category, imageUrl };
    if (price === '') {
      dispatch(
        setAlert('Add menu item failed!', 'Price is required!', 'error')
      );
      return;
    }
    try {
      dispatch({ type: START_LOADING_MENU_ITEMS });
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
    }
  };

export const addMenuItemCategory = (name, order) => async (dispatch) => {
  const body = { name, order };
  dispatch({ type: START_LOADING_CATEGORIES });

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
  }
};

export const deleteMenuItemCategory =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_CATEGORIES });
      const menuItems = await api.delete(
        `/menu/deleteAllMenuItemsOfCategory/${id}`
      );
      const categories = await api.delete(`/menu/deleteMenuItemCategory/${id}`);

      const menuItemsData = menuItems.data;
      const categoriesData = categories.data;
      dispatch({
        type: DELETE_MENU_ITEM_CATEGORY,
        payload: { menuItemsData, categoriesData },
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'error'));
        });
      }
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
    }
  };

// Add Wanted Edit Menu Item To State
export const closeOrOpenMenuItem = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_MENU_ITEMS });
    const body = { name };

    const res = await api.put('/menu/closeOrOpenMenuItem', body);

    dispatch({
      type: CLOSE_OR_OPEN_MENU_ITEM,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'error'));
      });
    }
  }
};
