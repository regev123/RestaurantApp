import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SelectMUI from '../../../../components/layout/SelectMUI';
import { addMenuItemToLine } from '../../../../actions/lines';

import './AddMenuItemToLine.css';

const AddMenuItemToLine = ({
  menuItems,
  menuItemCategories,
  lines,
  addMenuItemToLine,
}) => {
  const [activeCategory, setActiveCategory] = useState(
    menuItemCategories.length > 0 ? menuItemCategories[0].name : ''
  );
  const [activeLine, setActiveLine] = useState(
    lines.length > 0 ? lines[0].name : ''
  );

  useEffect(() => {
    setActiveCategory(
      menuItemCategories.length > 0 ? menuItemCategories[0].name : ''
    );
  }, [menuItemCategories]);

  useEffect(() => {
    setActiveLine(lines.length > 0 ? lines[0].name : '');
  }, [lines]);

  const menuItemsFilterredByActiveCategory = menuItems.filter(
    (item) => item.category.name === activeCategory
  );

  const handleChangeCategory = (event) => {
    setActiveCategory(event.target.value);
  };

  const handleChangeLine = (event) => {
    setActiveLine(event.target.value);
  };

  const handleSelect = (item) => {
    const lineObject = lines.filter((line) => line.name === activeLine);
    addMenuItemToLine(lineObject[0], item);
  };

  return (
    <div className='add-menu-item-to-line-page-container'>
      <div className='add-menu-item-to-line-page-container-title'>
        <h2>Add Menu Item to Line</h2>
      </div>
      <div className='add-menu-item-to-line-page-container-select-line'>
        <SelectMUI
          menuItemCategories={lines}
          handleChange={handleChangeLine}
          activeCategory={activeLine}
        />
      </div>
      <div className='add-menu-item-to-line-page-container-select'>
        <SelectMUI
          menuItemCategories={menuItemCategories}
          handleChange={handleChangeCategory}
          activeCategory={activeCategory}
        />
      </div>

      <div className='add-menu-item-to-line-page-box-container'>
        {menuItemsFilterredByActiveCategory.map((item) => (
          <div key={item.name} className='add-menu-item-to-line-page-box'>
            <img
              className={item.close ? 'gray-scale' : ''}
              src={item.imageUrl}
              alt={item.name}
            />

            <div className='add-menu-item-to-line-page-box-content'>
              <h5>{item.name}</h5>
              <p>
                {item.ingredients
                  .map((ingredient) => ingredient.name)
                  .join(', ')}
              </p>
            </div>

            <div className='add-menu-item-to-line-page-box-select'>
              <button onClick={() => handleSelect(item)}>Select</button>
            </div>
          </div>
        ))}
      </div>
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
