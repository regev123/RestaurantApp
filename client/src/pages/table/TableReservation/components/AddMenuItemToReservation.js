import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SelectMUI from '../../../../components/layout/SelectMUI';

import { Pagination, Stack } from '@mui/material';

import './AddMenuItemToReservation.css';

const AddMenuItemToReservation = ({
  menuItems,
  menuItemCategories,
  setMenuItemToReservation,
}) => {
  const [activeCategory, setActiveCategory] = useState(
    menuItemCategories.length > 0 ? menuItemCategories[0].name : ''
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    setActiveCategory(
      menuItemCategories.length > 0 ? menuItemCategories[0].name : ''
    );
  }, [menuItemCategories]);

  const menuItemsFilterredByActiveCategory = menuItems.filter(
    (item) => item.category.name === activeCategory
  );
  const totalPages = Math.ceil(menuItemsFilterredByActiveCategory.length / 5);

  const currentItems = menuItemsFilterredByActiveCategory.slice(
    (page - 1) * 5,
    page * 5
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleChange = (event) => {
    setActiveCategory(event.target.value);
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
    <div className='add-menu-item-to-reservation-page-container'>
      <div className='add-menu-item-to-reservation-page-container-dropdown'>
        <div className='add-menu-item-to-reservation-page-container-select'>
          <SelectMUI
            menuItemCategories={menuItemCategories}
            handleChange={handleChange}
            activeCategory={activeCategory}
          />
        </div>
        <div className='add-menu-item-to-reservation-page-box-container'>
          {currentItems.map((item) => (
            <div
              key={item.name}
              className='add-menu-item-to-reservation-page-box'
            >
              <img
                className={item.close ? 'gray-scale' : ''}
                src={item.imageUrl}
                alt={item.name}
              />

              <div className='add-menu-item-to-reservation-page-box-content'>
                <h5>
                  {item.name}
                  <span> ${item.price}</span>
                </h5>
                <p>
                  {item.ingredients
                    .map((ingredient) => ingredient.name)
                    .join(', ')}
                </p>
              </div>

              <div className='add-menu-item-to-reservation-page-box-select'>
                {!item.close && (
                  <button
                    onClick={() =>
                      handleSelect(
                        item.name,
                        item.price,
                        item.ingredients,
                        item.category
                      )
                    }
                  >
                    Select
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className='add-menu-item-to-reservation-page-box-paginiation'>
          <Stack spacing={2} alignItems='center'>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color='secondary'
              sx={{
                '.MuiPaginationItem-previousNext': {
                  background: 'black',
                },
                '& .MuiPaginationItem-previousNext:hover': {
                  backgroundColor: 'green',
                },
              }}
            />
          </Stack>
        </div>
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
