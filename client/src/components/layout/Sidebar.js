import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './Sidebar.css';

const Sidebar = ({ auth, logout }) => {
  return (
    <div class='warpper-sidebar'>
      <h2 class='sidebar-subject'>Restaurant-Name</h2>

      <ul class='sidebar-list'>
        <li>
          <a>
            <i class='bx bx-home'></i>
            <Link class='sidebar-link-name' to='/'>
              Home
            </Link>
          </a>
        </li>
        {auth.user.role === 'admin' && (
          <li>
            <a>
              <i class='bx bx-user-check'></i>
              <Link class='sidebar-link-name' to='/admin'>
                Admin
              </Link>
            </a>
          </li>
        )}
        <li>
          <a>
            <i class='bx bx-restaurant'></i>
            <Link class='sidebar-link-name' to='/tables'>
              Tables
            </Link>
          </a>
        </li>
        <li>
          <a>
            <i class='bx bx-edit'></i>
            <Link class='sidebar-link-name' to='/reservations'>
              Reservations
            </Link>
          </a>
        </li>

        <li>
          <div class='sidebar-icon-link-logout'>
            <a>
              <i class='bx bx-log-out sidebar-logout-icon'></i>
              <span onClick={logout}>Logout</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  logout: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Sidebar);
