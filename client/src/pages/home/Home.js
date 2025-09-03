import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Home.css';

const Home = ({ user }) => {
  return (
    <div className='page-fixed-position-navbar'>
      <div className='page-container'></div>
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
