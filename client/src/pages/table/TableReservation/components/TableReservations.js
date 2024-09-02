import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Clock from '../../../../components/layout/Clock';

import './TableReservations.css';

import {
  removeHold,
  deleteItem,
  setItemAsClose,
} from '../../../../actions/reservation';

const TableReservations = ({
  tableReservations,
  removeHold,
  deleteItem,
  setItemAsClose,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    tableReservations.map((reservation) => {
      reservation.items.map((item) => {
        if (!item.delete)
          setTotalPrice((prevPrice) => prevPrice + item.itemPrice);
      });
    });
  }, [tableReservations]);

  const removeHoldItemInReservation = (reservationId, itemId) => {
    removeHold(reservationId, itemId);
  };

  const deleteItemFromReservation = (reservationId, itemId) => {
    deleteItem(reservationId, itemId);
  };

  const changeReservationItemToClose = (reservationId, itemId) => {
    setItemAsClose(reservationId, itemId);
  };

  const handleSubmit = () => {};

  return (
    <div className='table-reservations-page-container'>
      <h2>Table Reservations</h2>
      <div className='table-reservations-page-reservations-list'>
        {tableReservations.map((reservation) => (
          <div className='table-reservations-page-reservation-item'>
            <div className='table-reservations-page-reservation-item-content'>
              <div className='table-reservations-page-reservation-item-content-date'>
                <Clock
                  starterString={'Time passed : '}
                  createdAt={reservation.createdAt}
                />
              </div>
              <div className='table-reservations-page-reservation-item-content-menu-items'>
                {reservation.items.map((item) => (
                  <div className='table-reservations-page-reservation-item-content-menu-item'>
                    <div className='table-reservations-page-reservation-item-content-menu-item-name'>
                      <h5>
                        {!item.open && !item.delete && (
                          <div className='table-reservations-page-reservation-item-content-menu-item-name-close'>
                            {item.itemName}
                          </div>
                        )}
                        {item.delete && (
                          <div className='table-reservations-page-reservation-item-content-menu-item-name-delete'>
                            {item.itemName}
                          </div>
                        )}
                        {item.open && !item.delete && item.itemName}
                        {!item.delete && item.hold && (
                          <button
                            className='table-reservations-page-reservation-item-content-menu-item-name-hold'
                            onClick={() =>
                              removeHoldItemInReservation(
                                reservation._id,
                                item._id
                              )
                            }
                          >
                            <i class='bx bxs-hand'></i>
                          </button>
                        )}
                        {!item.delete && item.fire && item.open && (
                          <button
                            className='table-reservations-page-reservation-item-content-menu-item-name-fire'
                            onClick={() =>
                              removeHoldItemInReservation(
                                reservation._id,
                                item._id
                              )
                            }
                            disabled
                          >
                            <i class='bx bxs-hand'></i>
                            <Clock createdAt={item.fireTimestamp} />
                          </button>
                        )}
                      </h5>
                      <div>
                        {item.open ? (
                          <button
                            className='table-reservations-page-reservation-item-content-menu-item-open-true'
                            onClick={() =>
                              changeReservationItemToClose(
                                reservation._id,
                                item._id
                              )
                            }
                          >
                            <i class='bx bx-check'></i>
                          </button>
                        ) : (
                          <button className='table-reservations-page-reservation-item-content-menu-item-open-false'>
                            <i class='bx bx-check'></i>
                          </button>
                        )}

                        {item.delete ? (
                          <button className='table-reservations-page-reservation-item-content-menu-item-delete-true'>
                            <i class='bx bx-trash'></i>
                          </button>
                        ) : (
                          <button
                            className='table-reservations-page-reservation-item-content-menu-item-delete-false'
                            onClick={() =>
                              deleteItemFromReservation(
                                reservation._id,
                                item._id
                              )
                            }
                          >
                            <i class='bx bx-trash'></i>
                          </button>
                        )}
                      </div>
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
      <div className='new-reservation-page-reservation-summary'>
        <p>Subtotal: ${totalPrice.toFixed(2)}</p>
        <button onClick={handleSubmit}>Payment</button>
      </div>
    </div>
  );
};

TableReservations.propTypes = {
  tableReservations: PropTypes.array.isRequired,
  removeHold: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  setItemAsClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tableReservations: state.reservation.tableReservations,
});

export default connect(mapStateToProps, {
  removeHold,
  deleteItem,
  setItemAsClose,
})(TableReservations);
