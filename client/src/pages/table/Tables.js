import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadTables } from '../../actions/tables';
import Spinner from '../../components/layout/Spinner';

import TableCard from '../../components/common/TableCard';

const Tables = ({ loading, tables, loadTables }) => {
  useEffect(() => {
    loadTables();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='page-fixed-position-navbar'>
      <TableCard tables={tables} />
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
