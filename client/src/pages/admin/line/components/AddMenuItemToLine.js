import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dropdown from '../../../../components/common/Dropdown';
import MenuItemBox from '../../../../components/layout/MenuItemBox';
import IconButton from '../../../../components/common/IconButton';
import Pagination from '../../../../components/common/Pagination';

import { addMenuItemToLine } from '../../../../actions/lines';

const AddMenuItemToLine = ({
  menuItems,
  menuItemCategories,
  lines,
  addMenuItemToLine,
}) => {
  const [category, setCategory] = useState('');
  const [line, setLine] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    if (!category && menuItemCategories.length > 0) {
      setCategory(menuItemCategories[0].name);
    }
  }, [menuItemCategories]);

  useEffect(() => {
    if (!line && lines.length > 0) {
      setLine(lines[0].name);
    }
  }, [lines]);

  const menuItemsFilterredByActiveCategory = menuItems.filter(
    (item) => item.category.name === category
  );

  const totalPages = Math.ceil(menuItemsFilterredByActiveCategory.length / 4);

  const currentItems = menuItemsFilterredByActiveCategory.slice(
    (currentPage - 1) * 4,
    currentPage * 4
  );

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const handleSelect = async (item) => {
    setAddingId(item._id);
    const lineObject = lines.filter((lineLoop) => lineLoop.name === line);
    await addMenuItemToLine(lineObject[0], item);
    setAddingId(null);
  };

  return (
    <div className='stick-to-bottom-container'>
      <div className='title' style={{ marginTop: '20px' }}>
        <h1>Add Menu Item to Line</h1>
      </div>
      <Dropdown
        selected={line}
        setSelected={setLine}
        options={lines.map((item) => item.name)}
      />
      <Dropdown
        selected={category}
        setSelected={setCategory}
        options={menuItemCategories.map((item) => item.name)}
      />
      <div style={{ marginTop: '3vh' }}>
        {currentItems.map((item) => (
          <MenuItemBox item={item}>
            <IconButton
              icon={
                addingId === item._id
                  ? 'bx bx-loader-circle bx-spin'
                  : 'bx bx-plus-circle'
              }
              onClick={() => handleSelect(item)}
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
  );
};

AddMenuItemToLine.propTypes = {
  lines: PropTypes.array.isRequired,
  menuItems: PropTypes.array.isRequired,
  menuItemCategories: PropTypes.array.isRequired,
  addMenuItemToLine: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lines: state.lines.lines,
  menuItems: state.menu.menuItems,
  menuItemCategories: state.menu.menuItemCategories,
});

export default connect(mapStateToProps, { addMenuItemToLine })(
  AddMenuItemToLine
);
