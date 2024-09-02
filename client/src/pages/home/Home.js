import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Home.css';

const Home = ({ user }) => {
  return (
    <div className='page-fixed-position-sidebar'>
      <div className='home-page-container'>
        <div className='home-page-container-title'>
          <h1>Hello {user.name}! Welcome back</h1>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Home);
