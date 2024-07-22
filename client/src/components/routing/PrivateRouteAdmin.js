import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, user, loading },
}) => {
  if (loading) return <Spinner />;
  if (isAuthenticated && user.role === 'admin')
    return (
      <Fragment>
        <Navbar />
        <Component />
      </Fragment>
    );

  return <Navigate to='/SignIn' />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
