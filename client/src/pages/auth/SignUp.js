import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { signUp } from '../../actions/auth';
import { Navigate, Link } from 'react-router-dom';

import Spinner from '../../components/layout/Spinner';

const SignUp = ({ setAlert, signUp, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert('Register Failed', 'Passwords do not match', 'error');
    } else {
      signUp({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }
  if (loading) {
    return <Spinner />;
  }

  return (
    <div class='body-signin'>
      <div class='wrapper-signin'>
        <form onSubmit={onSubmit}>
          <h1>Register</h1>
          <div class='input-box-signin'>
            <input
              name='name'
              id='fullName'
              type='text'
              placeholder='Full Name'
              required
              value={name}
              onChange={(e) => onChange(e)}
              autoComplete='off'
            />
            <i class='bx bxs-user'></i>
          </div>
          <div class='input-box-signin'>
            <input
              name='email'
              id='email'
              type='text'
              placeholder='Email'
              required
              value={email}
              onChange={(e) => onChange(e)}
              autoComplete='off'
            />
            <i class='bx bx-envelope'></i>
          </div>
          <div class='input-box-signin'>
            <input
              name='password'
              id='password'
              type='password'
              placeholder='Password'
              required
              value={password}
              onChange={(e) => onChange(e)}
              autoComplete='off'
            />
            <i class='bx bxs-lock-alt'></i>
          </div>
          <div class='input-box-signin'>
            <input
              name='passwordConfirm'
              id='confirmPassword'
              type='password'
              placeholder='Confirm Password'
              required
              value={passwordConfirm}
              onChange={(e) => onChange(e)}
              autoComplete='off'
            />
            <i class='bx bx-check-shield'></i>
          </div>

          <button type='submit' class='btn-signin'>
            Login
          </button>
          <div class='register-link'>
            <p>
              Already have an account?
              <a>
                <Link to='/SignIn'> Login</Link>
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { setAlert, signUp })(SignUp);
