import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  deleteTable,
  loadTables,
  addTable,
  updateTableSeats,
} from '../../../actions/tables';
import Spinner from '../../../components/layout/Spinner';
import InputField from '../../../components/common/InputField';
import IconButton from '../../../components/common/IconButton';
import '../../../components/common/Table.css';

const AdminTables = ({
  loading,
  tables,
  loadTables,
  deleteTable,
  addTable,
  updateTableSeats,
}) => {
  useEffect(() => {
    loadTables();
  }, []);

  const [seats, setSeats] = useState('');
  const [editingTableId, setEditingTableId] = useState(null); // Track which table is being edited
  const [newSeats, setNewSeats] = useState(''); // Temp state for the edited seats

  const handleAddTable = async (e) => {
    e.preventDefault();
    if (!seats.trim() || isNaN(seats)) return;
    addTable(seats);
    setSeats(''); // Clear the input field
  };

  const handleDelete = (id) => {
    deleteTable({ id });
  };

  const startEditing = (id, currentSeats) => {
    setEditingTableId(id);
    setNewSeats(currentSeats); // Set initial value of the input to the current seats
  };

  const saveSeats = (id) => {
    if (isNaN(newSeats) || !newSeats.trim()) return;
    updateTableSeats(id, parseInt(newSeats)); // Dispatch the update action
    setEditingTableId(null); // Exit editing mode
  };

  const cancelEditing = () => {
    setEditingTableId(null); // Exit editing mode without saving
  };

  const onChange = (e) => {
    setSeats(e.target.value);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='page-fixed-position-navbar'>
      <div className='table-manager'>
        <div className='title'>
          <h1>Table Manager</h1>
        </div>

        <div className='elements-in-one-line'>
          <InputField
            name={'seats'}
            value={seats}
            onChange={onChange}
            type={'number'}
            placeholder={'Enter number of seats'}
          />
          <IconButton
            icon={'bx bx-plus-circle black'}
            onClick={handleAddTable}
          />
        </div>
        <div className='table-container'>
          <table className='table-list'>
            <thead>
              <tr>
                <th>Table Number</th>
                <th>Seats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.length > 0 ? (
                tables.map((table) => (
                  <tr key={table._id}>
                    <td>{table.number}</td>
                    <td>
                      {editingTableId === table._id ? (
                        <input
                          type='number'
                          value={newSeats}
                          className='edit-input'
                          onChange={(e) => setNewSeats(e.target.value)}
                        />
                      ) : (
                        table.seats
                      )}
                    </td>
                    <td>
                      {editingTableId === table._id ? (
                        <>
                          <IconButton
                            icon={'bx bx-save green'}
                            onClick={() => saveSeats(table._id)}
                          />
                          <IconButton
                            icon={'bx bx-message-square-x red'}
                            onClick={cancelEditing}
                          />
                        </>
                      ) : (
                        <>
                          <IconButton
                            icon={'bx bx-edit cyan'}
                            onClick={() => startEditing(table._id, table.seats)}
                          />
                          <IconButton
                            icon={'bx bx-trash red'}
                            onClick={() => handleDelete(table._id)}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='3' className='no-tables'>
                    No tables added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

AdminTables.propTypes = {
  loadTables: PropTypes.func.isRequired,
  deleteTable: PropTypes.func.isRequired,
  addTable: PropTypes.func.isRequired,
  updateTableSeats: PropTypes.func.isRequired, // New prop validation
  loading: PropTypes.bool,
  tables: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.table.loading,
  tables: state.table.tables,
});

export default connect(mapStateToProps, {
  loadTables,
  deleteTable,
  addTable,
  updateTableSeats, // Map the new action
})(AdminTables);
