import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './globalStyles.css';
import 'boxicons/css/boxicons.min.css';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Home from './pages/home/Home';
import AdminLandingPage from './pages/admin/AdminLandingPage';
import AdminTables from './pages/admin/table/AdminTables';
import AdminMenu from './pages/admin/menu/AdminMenu';
import AdminLine from './pages/admin/line/AdminLine';
import Tables from './pages/table/Tables';
import TableReservation from './pages/table/TableReservation/TableReservation';
import Alert from './components/layout/AlertHandle';
import PrivateRoute from './components/routing/PrivateRoute';
import Reservations from './pages/reservations/Reservations';
//Redux

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';
import './globalStyles.css';
import PrivateRouteAdmin from './components/routing/PrivateRouteAdmin';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Routes>
          <Route exact path='/' element={<PrivateRoute component={Home} />} />
          <Route
            exact
            path='/admin'
            element={<PrivateRouteAdmin component={AdminLandingPage} />}
          />
          <Route
            exact
            path='/admin/tables'
            element={<PrivateRouteAdmin component={AdminTables} />}
          />
          <Route
            exact
            path='/admin/menu'
            element={<PrivateRouteAdmin component={AdminMenu} />}
          />
          <Route
            exact
            path='/admin/line'
            element={<PrivateRouteAdmin component={AdminLine} />}
          />
          <Route
            exact
            path='/tables'
            element={<PrivateRoute component={Tables} />}
          />
          <Route
            exact
            path='/reservations'
            element={<PrivateRoute component={Reservations} />}
          />
          <Route
            exact
            path='/tables/reservation/:tableId'
            element={<PrivateRoute component={TableReservation} />}
          />
          <Route exact path='/SignIn' element={<SignIn />} />
          <Route exact path='/SignUp' element={<SignUp />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
