import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteTable, loadTables, addTable } from '../../../actions/tables';
import Spinner from '../../../components/layout/Spinner';

import './AdminTables.css';

const AdminTables = ({
  loading,
  tables,
  loadTables,
  deleteTable,
  addTable,
}) => {
  useEffect(() => {
    //call table action to get all the tables
    loadTables();
    //after the table loaded make them in a variable that inside the box will load them all
  }, []);

  const [formData, setFormData] = useState({
    seatsNumber: 1,
  });

  const { seatsNumber } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTable = async (e) => {
    e.preventDefault();

    addTable(seatsNumber);
  };

  const handleDelete = (id) => {
    deleteTable({ id });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='page-fixed-position-sidebar'>
      <div className='admin-tables-container'>
        <div className='admin-tables-container-add-table-form'>
          <h3>Add New Table</h3>
          <form onSubmit={handleAddTable}>
            <input
              onChange={(e) => onChange(e)}
              className='admin-tables-container-form-input'
              name='seatsNumber'
              id='seatsNumber'
              type='text'
              placeholder='Seats number'
              required
            />
            <button type='submit' className='admin-tables-container-form-btn'>
              add table
            </button>
          </form>
        </div>
        <div className='admin-tables-container-box-view-tables'>
          {tables.map((table) => (
            <div className='admin-tables-container-box-table'>
              <p>table number: {table.number}</p>
              <p>seats number: {table.seats}</p>
              <button
                onClick={() => handleDelete(table._id)}
                className='admin-tables-container-box-table-btn'
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

AdminTables.propTypes = {
  loadTables: PropTypes.func.isRequired,
  deleteTable: PropTypes.func.isRequired,
  addTable: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  tables: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.table.loading,
  tables: state.table.tables,
});

export default connect(mapStateToProps, { loadTables, deleteTable, addTable })(
  AdminTables
);
