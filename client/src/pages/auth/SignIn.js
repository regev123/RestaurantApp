import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../../actions/auth';

import Spinner from '../../components/layout/Spinner';
import InputFieldAuth from '../../components/layout/Auth/InputFieldAuth';
import ButtonAuth from '../../components/layout/Auth/ButtonAuth';
import LinkCall from '../../components/common/LinkCall';

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
    <div class='body-authentication'>
      <div class='wrapper-authentication'>
        <h1>Login</h1>
        <InputFieldAuth
          name={'email'}
          value={email}
          onChange={onChange}
          placeholder={'Email'}
          icon={'bx bxs-user'}
          fullWidth={true}
        />
        <InputFieldAuth
          name={'password'}
          value={password}
          onChange={onChange}
          placeholder={'Password'}
          type={'password'}
          fullWidth={true}
        />
        <ButtonAuth onClick={onSubmit} title={'Login'} fullWidth={true} />
        <LinkCall
          title={`Don't have an account?`}
          link={'/SignUp'}
          linkName={'Register'}
        />
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
