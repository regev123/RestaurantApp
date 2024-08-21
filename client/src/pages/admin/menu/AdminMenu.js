import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DeleteEditMenuItem from './components/DeleteEditMenuItem';
import Spinner from '../../../components/layout/Spinner';
import { loadMenuItems, loadMenuItemCategories } from '../../../actions/menu';
import './AdminMenu.css';
import AddMenuItem from './components/AddMenuItem';
import MenuItemCategory from './components/MenuItemCategory';
const AdminMenuTab = ({
  loadingMenuItems,
  loadingCategories,
  loadMenuItemCategories,
  loadMenuItems,
}) => {
  const [checked, setChecked] = React.useState(false);
  const [editMenuItem, setEditMenuItem] = useState(null);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    loadMenuItemCategories();
    loadMenuItems();
  }, []);

  if (loadingMenuItems || loadingCategories) return <Spinner />;

  return (
    <div className='page-fixed-position-sidebar'>
      <div className='admin-menu-container'>
        <div className='admin-menu-box-container'>
          <DeleteEditMenuItem setEditMenuItem={setEditMenuItem} />
        </div>
        <div className='admin-menu-box-container'>
          <AddMenuItem
            editMenuItemObject={editMenuItem}
            setEditMenuItem={setEditMenuItem}
          />
        </div>
        <div className='admin-menu-box-container'>
          <MenuItemCategory />
        </div>
      </div>
    </div>
  );
};

AdminMenuTab.propTypes = {
  loadMenuItems: PropTypes.func.isRequired,
  loadMenuItemCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loadingMenuItems: state.menu.loadingMenuItems,
  loadingCategories: state.menu.loadingCategories,
});

export default connect(mapStateToProps, {
  loadMenuItems,
  loadMenuItemCategories,
})(AdminMenuTab);
