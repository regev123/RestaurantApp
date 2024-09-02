import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from '@mui/material/TextField';

import { addLine, deleteLine } from '../../../../actions/lines';

import './AddDeleteLine.css';

const AddDeleteLine = ({ lines, addLine, deleteLine }) => {
  const [newLine, setNewLine] = useState('');

  useEffect(() => {}, [lines]);

  const onChange = (e) => setNewLine(e.target.value);

  const addNewLine = (lineName) => {
    addLine(lineName);
  };

  return (
    <div className='line-page-conatiner'>
      <div className='line-page-conatiner-title'>
        <h2>Add or Delete Line</h2>
      </div>
      <div className='line-page-conatiner-form-group'>
        <div className='line-page-conatiner-form-group-add-line'>
          <TextField
            id='name'
            name='name'
            required
            label='Line Name *'
            value={newLine}
            onChange={(e) => onChange(e)}
            sx={{ width: '80%' }}
          />
          <button onClick={() => addNewLine(newLine)}>
            <i class='bx bx-plus-circle'></i>
          </button>
        </div>
      </div>
      <div className='line-page-conatiner-form-group'>
        <ul className='line-page-conatiner-form-group-line-list'>
          {lines.map((line) => (
            <li className='line-page-conatiner-form-group-line-item'>
              {line.name}
              <div className='line-page-conatiner-form-group-line-item-remove-btn'>
                <button onClick={() => deleteLine(line._id)}>
                  <i class='bx bx-trash'></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
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
