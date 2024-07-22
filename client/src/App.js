import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Alert from './components/layout/AlertHandle';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';
import './App.css';
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
            element={<PrivateRouteAdmin component={Admin} />}
          />
          <Route exact path='/SignIn' element={<SignIn />} />
          <Route exact path='/SignUp' element={<SignUp />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
