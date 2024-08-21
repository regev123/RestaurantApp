import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Clock from '../../../../components/layout/Clock';

import './TableReservations.css';

const removeHold = (reservationId, itemId) => {
  console.log(reservationId, itemId);
};

const TableReservations = ({ tableReservations }) => {
  return (
    <div className='table-reservations-page-container'>
      <h2>Table Reservations</h2>
      <div className='table-reservations-page-reservations-list'>
        {tableReservations.map((reservation) => (
          <div className='table-reservations-page-reservation-item'>
            <div className='table-reservations-page-reservation-item-content'>
              <div className='table-reservations-page-reservation-item-content-date'>
                <Clock createdAt={reservation.createdAt} />
              </div>
              <div className='table-reservations-page-reservation-item-content-menu-items'>
                {reservation.items.map((item) => (
                  <div className='table-reservations-page-reservation-item-content-menu-item'>
                    <div className='table-reservations-page-reservation-item-content-menu-item-name'>
                      <h5>
                        {item.open ? (
                          item.itemName
                        ) : (
                          <div className='table-reservations-page-reservation-item-content-menu-item-name-close'>
                            {item.itemName}
                          </div>
                        )}
                        {item.hold && (
                          <button
                            onClick={() =>
                              removeHold(reservation._id, item._id)
                            }
                          >
                            <i class='bx bxs-hand'></i>
                          </button>
                        )}
                      </h5>
                    </div>
                    <div className='table-reservations-page-reservation-item-content-menu-item-removed-ingridients'>
                      {item.ingredientsRemoved.map((removed) => (
                        <h5>Without {removed}</h5>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TableReservations.propTypes = {
  tableReservations: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tableReservations: state.reservation.tableReservations,
});

export default connect(mapStateToProps, {})(TableReservations);
