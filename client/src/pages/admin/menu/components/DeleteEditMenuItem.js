import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SelectMUI from '../../../../components/layout/SelectMUI';
import { Pagination, Stack } from '@mui/material';

import { deleteMenuItem, closeOrOpenMenuItem } from '../../../../actions/menu';
import './DeleteEditMenuItem.css';

const DeleteEditMenuItem = ({
  setEditMenuItem,
  deleteMenuItem,
  menuItemCategories,
  closeOrOpenMenuItem,
  menuItems,
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

  const handleDelete = (id) => {
    deleteMenuItem({ id });
  };

  const handleEdit = (name, price, ingredients, category, imageUrl) => {
    setEditMenuItem({ name, price, ingredients, category, imageUrl });
  };

  const handleChange = (event) => {
    setActiveCategory(event.target.value);
  };

  const handleCheckboxChange = (name) => {
    closeOrOpenMenuItem(name);
  };

  return (
    <div className='delete-edit-menu-item-container'>
      <div className='delete-edit-menu-item-dropdown'>
        <div className='delete-edit-menu-item-select'>
          <SelectMUI
            menuItemCategories={menuItemCategories}
            handleChange={handleChange}
            activeCategory={activeCategory}
          />
        </div>
        <div className='delete-edit-menu-item-box-container'>
          {currentItems.map((item) => (
            <div key={item.name} className='delete-edit-menu-item-box'>
              <img
                className={item.close ? 'gray-scale' : ''}
                src={item.imageUrl}
                alt={item.name}
              />

              <div className='delete-edit-menu-item-box-content'>
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
              <div className='delete-edit-menu-item-box-actions'>
                <div className='delete-edit-menu-item-box-action-delete'>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
                <div className='delete-edit-menu-item-box-action-edit'>
                  <button
                    onClick={() =>
                      handleEdit(
                        item.name,
                        item.price,
                        item.ingredients,
                        item.category,
                        item.imageUrl
                      )
                    }
                  >
                    Edit
                  </button>
                </div>
                <div className='delete-edit-menu-item-box-action-checkbox'>
                  <label>
                    <input
                      type='checkbox'
                      checked={item.close}
                      onChange={() => handleCheckboxChange(item.name)}
                    />
                    Close
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='delete-edit-menu-item-box-paginiation'>
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

DeleteEditMenuItem.propTypes = {
  loading: PropTypes.bool,
  menuItems: PropTypes.array.isRequired,
  deleteMenuItem: PropTypes.func.isRequired,
  menuItemCategories: PropTypes.array.isRequired,
  closeOrOpenMenuItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.menu.loading,
  menuItems: state.menu.menuItems,
  menuItemCategories: state.menu.menuItemCategories,
});

export default connect(mapStateToProps, {
  deleteMenuItem,
  closeOrOpenMenuItem,
})(DeleteEditMenuItem);
