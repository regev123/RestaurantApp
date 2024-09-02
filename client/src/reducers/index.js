import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import table from './tables';
import menu from './menu';
import reservation from './reservation';
import lines from './lines';
export default combineReducers({
  alert,
  auth,
  table,
  menu,
  reservation,
  lines,
});
