import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import table from './tables';
import menu from './menu';
export default combineReducers({ alert, auth, table, menu });
