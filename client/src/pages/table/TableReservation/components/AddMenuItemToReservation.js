import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MenuItemBox from '../../../../components/layout/MenuItemBox';
import IconButton from '../../../../components/common/IconButton';
import Dropdown from '../../../../components/common/Dropdown';
import Pagination from '../../../../components/common/Pagination';

import './AddMenuItemToReservation.css';

const AddMenuItemToReservation = ({
  menuItems,
  menuItemCategories,
  setMenuItemToReservation,
}) => {
  const [category, setCategory] = useState(
    menuItemCategories.length > 0 ? menuItemCategories[0].name : ''
  );
  const [currentPage, setCurrentPage] = useState(1);

  const menuItemsFilterredByActiveCategory = menuItems.filter(
    (item) => item.category.name === category
  );
  const totalPages = Math.ceil(menuItemsFilterredByActiveCategory.length / 5);

  const currentItems = menuItemsFilterredByActiveCategory.slice(
    (currentPage - 1) * 5,
    currentPage * 5
  );

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const handleSelect = (name, price, ingredients, category) => {
    setMenuItemToReservation({
      name,
      price,
      ingredients,
      category,
      hold: false,
    });
  };

  return (
    <div className='stick-to-bottom-container'>
      <div className='add-menu-item-to-reservation-page-container-dropdown'>
        <Dropdown
          selected={category}
          setSelected={setCategory}
          options={menuItemCategories.map((category) => category.name)}
        />
        <div style={{ marginTop: '3vh' }}>
          {currentItems.map((item) => (
            <MenuItemBox item={item}>
              <IconButton
                icon={'bx bx-plus-circle'}
                onClick={() =>
                  handleSelect(
                    item.name,
                    item.price,
                    item.ingredients,
                    item.category
                  )
                }
              />
            </MenuItemBox>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

AddMenuItemToReservation.propTypes = {
  menuItems: PropTypes.array.isRequired,
  menuItemCategories: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  menuItems: state.menu.menuItems,
  menuItemCategories: state.menu.menuItemCategories,
});

export default connect(mapStateToProps, {})(AddMenuItemToReservation);
