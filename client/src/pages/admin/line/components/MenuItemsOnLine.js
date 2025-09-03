import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dropdown from '../../../../components/common/Dropdown';
import IconButton from '../../../../components/common/IconButton';
import { DeleteMenuItemFromLine } from '../../../../actions/lines';

const MenuItemsOnLine = ({ lines, DeleteMenuItemFromLine }) => {
  const [line, setLine] = useState(lines[0].name);
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteMenuItemFromLine = async (lineId, itemId) => {
    setDeletingId(itemId);
    await DeleteMenuItemFromLine(lineId, itemId);
    setDeletingId(null);
  };

  const selectedLine = lines.find((lineLoop) => lineLoop.name === line);
  if (!selectedLine) return null;

  return (
    <>
      <div className='title' style={{ marginTop: '20px' }}>
        <h1>Menu Items On Lines</h1>
      </div>

      <Dropdown
        selected={line}
        setSelected={setLine}
        options={lines.map((item) => item.name)}
      />
      <ul
        className='modern-list'
        style={{ maxHeight: '70vh', marginTop: '30px', maxWidth: '100vw' }}
      >
        {selectedLine.menuItems.map((item) => (
          <li key={item._id} className='modern-list-item'>
            <span className='modern-item-name'>{item.name}</span>
            <IconButton
              icon={
                deletingId === item._id
                  ? 'bx bx-loader-circle bx-spin'
                  : 'bx bx-trash red'
              }
              disabled={deletingId === item._id}
              onClick={() =>
                handleDeleteMenuItemFromLine(selectedLine._id, item._id)
              }
            />
          </li>
        ))}
      </ul>
    </>
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
