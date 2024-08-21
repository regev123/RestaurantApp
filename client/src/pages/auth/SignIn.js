import React, { useState } from 'react';

import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../../actions/auth';
import Spinner from '../../components/layout/Spinner';
import './SignIn.css';
const SignIn = ({ signIn, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };

  if (isAuthenticated && !loading) {
    return <Navigate to='/' />;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <div class='body-signin'>
      <div class='wrapper-signin'>
        <form onSubmit={onSubmit}>
          <h1>Login</h1>
          <div class='input-box-signin'>
            <input
              name='email'
              id='email'
              type='text'
              placeholder='Email'
              required
              value={email}
              onChange={onChange}
              autoComplete='off'
            />
            <i class='bx bxs-user'></i>
          </div>
          <div class='input-box-signin'>
            <input
              name='password'
              id='password'
              type='password'
              placeholder='Password'
              required
              value={password}
              onChange={onChange}
              autoComplete='off'
            />
            <i class='bx bxs-lock-alt'></i>
          </div>
          <button type='submit' class='btn-signin'>
            Login
          </button>
          <div class='register-link'>
            <p>
              Don't have an account?
              <a>
                <Link to='/SignUp'> Register</Link>
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

signIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { signIn })(SignIn);
