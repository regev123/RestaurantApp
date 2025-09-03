import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AlertHandle.css';

const AlertHandle = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <div className='alert-wrapper'>
      {alerts.map((alert, index) => (
        <div key={index} className={`alert-box ${alert.alertType}`}>
          <i
            className={
              alert.alertType === 'error'
                ? 'bx bx-error-circle'
                : alert.alertType === 'success'
                ? 'bx bx-check-circle'
                : 'bx bx-info-circle'
            }
          ></i>
          <div>
            <h3>{alert.subject}</h3>
            <p>{alert.msg}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

AlertHandle.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AlertHandle);
