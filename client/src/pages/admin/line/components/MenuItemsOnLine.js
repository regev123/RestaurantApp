import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { DeleteMenuItemFromLine } from '../../../../actions/lines';

import './MenuItemsOnLine.css';

const MenuItemsOnLine = ({ lines, DeleteMenuItemFromLine }) => {
  const handleDeleteMenuItemFromLine = (lineId, itemId) => {
    DeleteMenuItemFromLine(lineId, itemId);
  };

  return (
    <div className='menu-item-on-line-page-container'>
      <h2>Menu Items On Lines</h2>
      <div className='menu-item-on-line-page-list'>
        {lines.map((line) => (
          <div className='menu-item-on-line-page-item-list-by-line-container'>
            <div className='menu-item-on-line-page-item-list-by-line-title'>
              <h6>{line.name}</h6>
            </div>
            {line.menuItems.map((item) => (
              <div className='menu-item-on-line-page-item'>
                <div className='menu-item-on-line-page-line-item-content'>
                  <h6>{item.name}</h6>
                  <button
                    onClick={() =>
                      handleDeleteMenuItemFromLine(line._id, item._id)
                    }
                    className='menu-item-on-line-page-line-item-content-btn'
                  >
                    <i class='bx bx-trash'></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

MenuItemsOnLine.propTypes = {
  lines: PropTypes.array.isRequired,
  DeleteMenuItemFromLine: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lines: state.lines.lines,
});

export default connect(mapStateToProps, { DeleteMenuItemFromLine })(
  MenuItemsOnLine
);
