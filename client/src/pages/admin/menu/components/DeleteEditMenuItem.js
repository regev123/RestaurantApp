import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dropdown from '../../../../components/common/Dropdown';
import MenuItemBox from '../../../../components/layout/MenuItemBox';
import IconButton from '../../../../components/common/IconButton';
import Pagination from '../../../../components/common/Pagination';
import Checkbox from '../../../../components/common/Checkbox';

import { deleteMenuItem, closeOrOpenMenuItem } from '../../../../actions/menu';

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
  const [currentPage, setCurrentPage] = useState(1);

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
    (currentPage - 1) * 5,
    currentPage * 5
  );

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const handleDelete = (id) => {
    deleteMenuItem({ id });
  };

  const handleEdit = (name, price, ingredients, category, imageUrl) => {
    setEditMenuItem({ name, price, ingredients, category, imageUrl });
  };

  const handleCheckboxChange = (name) => {
    closeOrOpenMenuItem(name);
  };

  return (
    <div className='stick-to-bottom-container'>
      <Dropdown
        selected={activeCategory}
        setSelected={setActiveCategory}
        options={menuItemCategories.map((item) => item.name)}
        title={'Choose Category'}
      />
      <div style={{ marginTop: '3vh' }}>
        {currentItems.map((item) => (
          <MenuItemBox item={item}>
            <div style={{ marginLeft: '1vw' }}>
              <IconButton
                icon={'bx bx-trash red'}
                onClick={() => handleDelete(item._id)}
              />

              <IconButton
                icon={'bx bx-edit green'}
                onClick={() =>
                  handleEdit(
                    item.name,
                    item.price,
                    item.ingredients,
                    item.category,
                    item.imageUrl
                  )
                }
              />
            </div>
            <div style={{ marginLeft: '1.3vw' }}>
              <Checkbox
                label={'Close'}
                checked={item.close}
                onChange={() => handleCheckboxChange(item.name)}
              />
            </div>
          </MenuItemBox>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
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
