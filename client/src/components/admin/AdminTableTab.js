import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTable, loadTables, addTable } from '../../actions/tables';
import Spinner from '../layout/Spinner';
import { Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

const AdminTableTab = ({
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

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
  let elements = [];
  tables.map((table) => {
    elements.push(
      <Box
        key={table.number}
        height={150}
        width={150}
        my={2}
        m={1}
        display='inline-table'
        alignItems='center'
        gap={2}
        p={2}
        sx={{ border: '1px solid black', boxShadow: 12 }}
      >
        <h5>Table number:{table.number}</h5>
        <h5>Seats number:{table.seats}</h5>
        <Button
          variant='outlined'
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(table._id)}
        >
          Delete
        </Button>
      </Box>
    );
  });

  return (
    <React.Fragment>
      {elements}
      <Divider>
        <Chip label='Add new Table' size='small' />
      </Divider>

      <CssBaseline />
      <Box component='form' onSubmit={handleAddTable} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='seatsNumber'
              required
              id='seatsNumber'
              value={seatsNumber}
              label='Seats Number'
              onChange={(e) => onChange(e)}
            />
          </Grid>
        </Grid>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
          Add table
        </Button>
      </Box>
    </React.Fragment>
  );
};

AdminTableTab.prototype = {
  loadTables: PropTypes.func.isRequired,
  deleteTable: PropTypes.func.isRequired,
  addTable: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  tables: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.table.loading,
  tables: state.table.tables,
});

export default connect(mapStateToProps, { loadTables, deleteTable, addTable })(
  AdminTableTab
);
