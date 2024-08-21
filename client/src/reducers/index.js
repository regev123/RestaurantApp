import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import table from './tables';
import menu from './menu';
import reservation from './reservation';
export default combineReducers({ alert, auth, table, menu, reservation });
