import React from 'react';
import './ConfirmDialog.css';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className='confirm-dialog-overlay'>
      <div className='confirm-dialog'>
        <h2 className='confirm-dialog-title'>{title}</h2>
        <p className='confirm-dialog-message'>{message}</p>
        <div className='confirm-dialog-actions'>
          <button className='confirm-dialog-button confirm' onClick={onConfirm}>
            Confirm
          </button>
          <button className='confirm-dialog-button cancel' onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
