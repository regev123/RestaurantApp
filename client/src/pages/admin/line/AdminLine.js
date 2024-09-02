import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './AdminLine.css';
import AddDeleteLine from './components/AddDeleteLine';
import AddMenuItemToLine from './components/AddMenuItemToLine';
import { getAllLines } from '../../../actions/lines';
import { loadMenuItems, loadMenuItemCategories } from '../../../actions/menu';

import Spinner from '../../../components/layout/Spinner';
import MenuItemsOnLine from './components/MenuItemsOnLine';

const AdminLineTab = ({
  getAllLines,
  loadingLines,
  loadingMenuItems,
  loadingCategories,
  loadMenuItemCategories,
  loadMenuItems,
}) => {
  useEffect(() => {
    getAllLines();
    loadMenuItemCategories();
    loadMenuItems();
  }, []);

  if (loadingLines || loadingMenuItems || loadingCategories) return <Spinner />;

  return (
    <div className='page-fixed-position-sidebar'>
      <div className='admin-line-container'>
        <div className='admin-line-box-container'>
          <AddDeleteLine />
        </div>
        <div className='admin-line-box-container'>
          <AddMenuItemToLine />
        </div>
        <div className='admin-line-box-container'>
          <MenuItemsOnLine />
        </div>
      </div>
    </div>
  );
};

AdminLineTab.propTypes = {
  getAllLines: PropTypes.func.isRequired,
  loadMenuItems: PropTypes.func.isRequired,
  loadMenuItemCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loadingLines: state.lines.loadingLines,
  loadingMenuItems: state.menu.loadingMenuItems,
  loadingCategories: state.menu.loadingCategories,
});

export default connect(mapStateToProps, {
  getAllLines,
  loadMenuItems,
  loadMenuItemCategories,
})(AdminLineTab);
