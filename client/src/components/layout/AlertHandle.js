import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const AlertHandle = ({ alerts }) =>
  alerts.map((alert) => (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={alert.alertType}>{alert.msg}</Alert>
    </Stack>
  ));

AlertHandle.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AlertHandle);
