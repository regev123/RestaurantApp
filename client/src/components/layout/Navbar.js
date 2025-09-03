import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import './Navbar.css';

const Navbar = ({ auth, logout }) => {
  const { role, name } = auth.user;

  const renderAdminLink = () =>
    role === 'admin' && (
      <li>
        <Link to='/admin'>Admin</Link>
      </li>
    );

  const renderAuthSection = () => (
    <div className='navbar-auth'>
      <span className='navbar-welcome'>Hello, {name}</span>
      <button onClick={logout} className='navbar-logout'>
        <i className='bx bx-exit'></i> Logout
      </button>
    </div>
  );

  const renderLinks = () => (
    <ul className='navbar-links'>
      <li>
        <Link to='/'>Home</Link>
      </li>
      {renderAdminLink()}
      <li>
        <Link to='/Tables'>Tables</Link>
      </li>
      <li>
        <Link to='/Reservations'>Reservations</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <h1>Restaurant</h1>
      </div>
      {renderLinks()}
      {renderAuthSection()}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
