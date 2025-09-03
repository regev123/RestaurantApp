import React from 'react';
import './IconButton.css';

const IconButton = ({ icon, onClick }) => {
  return <i className={`icon-button ${icon}`} onClick={onClick} />;
};

export default IconButton;
