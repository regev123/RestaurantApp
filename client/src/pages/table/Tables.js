import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadTables } from '../../actions/tables';
import Spinner from '../../components/layout/Spinner';
import './Tables.css';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Tables = ({ loading, tables, loadTables }) => {
  useEffect(() => {
    loadTables();
  }, []);
  const navigate = useNavigate();

  const handleSelect = (id) => {
    //Navigate to reservation page with table number as URL param
    navigate(`/tables/reservation/${id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='page-fixed-position-sidebar'>
      <div className='tables-page-container'>
        <div className='tables-page-container-box-view-tables'>
          {tables.map((table) => (
            <div className='admin-tables-container-box-table'>
              <p>table number: {table.number}</p>
              <p>seats number: {table.seats}</p>
              <button
                onClick={() => handleSelect(table._id)}
                className='tables-page-container-box-table-btn'
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Tables.propTypes = {
  loading: PropTypes.bool.isRequired,
  tables: PropTypes.array.isRequired,
  loadTables: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.table.loading,
  tables: state.table.tables,
});

export default connect(mapStateToProps, { loadTables })(Tables);
