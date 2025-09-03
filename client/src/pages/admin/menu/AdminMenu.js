import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadMenuItems, loadMenuItemCategories } from '../../../actions/menu';

import AddMenuItem from './components/AddMenuItem';
import MenuItemCategory from './components/MenuItemCategory';
import DeleteEditMenuItem from './components/DeleteEditMenuItem';

import Spinner from '../../../components/layout/Spinner';

const AdminMenuTab = ({
  loadingMenuItems,
  loadingCategories,
  loadMenuItemCategories,
  loadMenuItems,
}) => {
  const [editMenuItem, setEditMenuItem] = useState(null);

  useEffect(() => {
    loadMenuItemCategories();
    loadMenuItems();
  }, []);

  if (loadingMenuItems || loadingCategories) return <Spinner />;

  return (
    <div className='page-fixed-position-navbar'>
      <div className='grid-of-three'>
        <div className='grid-of-three-container'>
          <DeleteEditMenuItem setEditMenuItem={setEditMenuItem} />
        </div>
        <div className='grid-of-three-container'>
          <AddMenuItem
            editMenuItemObject={editMenuItem}
            setEditMenuItem={setEditMenuItem}
          />
        </div>
        <div className='grid-of-three-container'>
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
