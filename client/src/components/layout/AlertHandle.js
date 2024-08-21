import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AlertHandle.css';

const AlertHandle = ({ alerts }) =>
  alerts.map((alert) => (
    // <Stack sx={{ width: '100%' }} spacing={2}>
    //   <Alert severity={alert.alertType}>{alert.msg}</Alert>
    // </Stack>
    <div className={`notification ${alert.alertType === 'error' && 'error'}`}>
      <div class='message'>
        {alert.alertType === 'error' && <i class='bx bx-error-circle'></i>}
        <div>
          <h3>{alert.subject}</h3>
          <span>{alert.msg}</span>
        </div>
      </div>
    </div>
  ));

AlertHandle.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AlertHandle);
