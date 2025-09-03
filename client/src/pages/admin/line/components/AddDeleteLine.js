import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addLine, deleteLine } from '../../../../actions/lines';
import InputField from '../../../../components/common/InputField';
import IconButton from '../../../../components/common/IconButton';

const AddDeleteLine = ({ lines, addLine, deleteLine }) => {
  const [newLine, setNewLine] = useState('');

  useEffect(() => {}, [lines]);

  const onChange = (e) => setNewLine(e.target.value);

  const addNewLine = () => {
    addLine(newLine);
  };

  return (
    <>
      <div className='title' style={{ marginTop: '20px' }}>
        <h1>Add or Delete Line</h1>
      </div>
      <div className='elements-in-one-line' style={{ marginTop: '25px' }}>
        <InputField
          name={'name'}
          value={newLine}
          onChange={(e) => onChange(e)}
          placeholder={'Line Name *'}
        />
        <IconButton icon={'bx bx-plus-circle'} onClick={addNewLine} />
      </div>

      <ul className='modern-list' style={{ maxHeight: '70vh' }}>
        {lines.map((line) => (
          <li className='modern-list-item'>
            <span className='modern-item-name'>{line.name}</span>
            <IconButton
              icon={'bx bx-trash red'}
              onClick={() => deleteLine(line._id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

AddDeleteLine.propTypes = {
  lines: PropTypes.array.isRequired,
  addLine: PropTypes.func.isRequired,
  deleteLine: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lines: state.lines.lines,
});

export default connect(mapStateToProps, { addLine, deleteLine })(AddDeleteLine);
