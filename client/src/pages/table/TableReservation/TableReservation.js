import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import AddMenuItemToReservation from './components/AddMenuItemToReservation';
import Spinner from '../../../components/layout/Spinner';

import { loadMenuItems, loadMenuItemCategories } from '../../../actions/menu';
import { getReservationsOfTable } from '../../../actions/reservation';
import './TableReservation.css';
import NewReservation from './components/NewReservation';
import TableReservations from './components/TableReservations';
const TableReservation = ({
  loadMenuItemCategories,
  loadMenuItems,
  loadingCategories,
  loadingMenuItems,
  loadingTableReservations,
  getReservationsOfTable,
}) => {
  const [menuItemToReservation, setMenuItemToReservation] = useState(null);
  const { tableId } = useParams();
  useEffect(() => {
    loadMenuItems();
    loadMenuItemCategories();
  }, [loadMenuItems, loadMenuItemCategories]);

  useEffect(() => {
    getReservationsOfTable(tableId);
  }, [getReservationsOfTable]);

  if (loadingCategories || loadingMenuItems || loadingTableReservations) {
    return <Spinner />;
  }

  return (
    <div className='page-fixed-position-sidebar'>
      <div className='table-reservation-page-container'>
        <div className='table-reservation-page-box-container'>
          <AddMenuItemToReservation
            setMenuItemToReservation={setMenuItemToReservation}
          />
        </div>
        <div className='table-reservation-page-box-container'>
          <NewReservation
            menuItemToReservation={menuItemToReservation}
            setMenuItemToReservation={setMenuItemToReservation}
          />
        </div>
        <div className='table-reservation-page-box-container'>
          <TableReservations />
        </div>
      </div>
    </div>
  );
};

TableReservation.propTypes = {
  menuItems: PropTypes.array.isRequired,
  menuItemCategories: PropTypes.array.isRequired,
  loadMenuItems: PropTypes.func.isRequired,
  loadMenuItemCategories: PropTypes.func.isRequired,
  loadingCategories: PropTypes.bool.isRequired,
  loadingMenuItems: PropTypes.bool.isRequired,
  loadingTableReservations: PropTypes.bool.isRequired,
  getReservationsOfTable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  menuItems: state.menu.menuItems,
  menuItemCategories: state.menu.menuItemCategories,
  loadingCategories: state.menu.loadingCategories,
  loadingMenuItems: state.menu.loadingMenuItems,
  loadingTableReservations: state.reservation.loadingTableReservations,
});

export default connect(mapStateToProps, {
  loadMenuItemCategories,
  loadMenuItems,
  getReservationsOfTable,
})(TableReservation);
