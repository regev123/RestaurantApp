import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { signUp } from '../../actions/auth';
import { Navigate } from 'react-router-dom';

import Spinner from '../../components/layout/Spinner';
import InputFieldAuth from '../../components/layout/Auth/InputFieldAuth';
import ButtonAuth from '../../components/layout/Auth/ButtonAuth';
import LinkCall from '../../components/common/LinkCall';

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
    <div class='body-authentication'>
      <div class='wrapper-authentication'>
        <h1>Register</h1>
        <InputFieldAuth
          name={'name'}
          value={name}
          onChange={onChange}
          placeholder={'Full Name'}
          icon={'bx bxs-user'}
        />
        <InputFieldAuth
          name={'email'}
          value={email}
          onChange={onChange}
          placeholder={'Email'}
          icon={'bx bx-envelope'}
        />
        <InputFieldAuth
          name={'password'}
          type={'password'}
          value={password}
          onChange={onChange}
          placeholder={'Password'}
        />
        <InputFieldAuth
          name={'passwordConfirm'}
          type={'password'}
          value={passwordConfirm}
          onChange={onChange}
          placeholder={'Confirm Password'}
        />
        <ButtonAuth onClick={onSubmit} title={'Register'} fullWidth={true} />
        <LinkCall
          title={`Already have an account? `}
          link={'/SignIn'}
          linkName={'Login'}
        />
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
