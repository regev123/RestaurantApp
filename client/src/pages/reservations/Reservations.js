import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SelectMUI from '../../components/layout/SelectMUI';
import { Pagination, Stack } from '@mui/material';

import { getReservations } from '../../actions/reservation';
import { getAllLines } from '../../actions/lines';
import Spinner from '../../components/layout/Spinner';
import Clock from '../../components/layout/Clock';

import './Reservations.css';

const Reservations = ({
  lines,
  reservations,
  getReservations,
  getAllLines,
  loadingReservations,
}) => {
  const [activeLine, setActiveLine] = useState(
    lines.length > 0 ? lines[0] : null
  );

  const [loadingLines, setLoadingLines] = useState(true);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllLines();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      getReservations();
    };
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setActiveLine(lines.length > 0 ? lines[0] : null);
    if (lines.length > 0) setLoadingLines(false);
  }, [lines]);

  useEffect(() => {}, [reservations]);

  const handleChangeLine = (event) => {
    const activeLine = lines.filter((line) => line.name === event.target.value);
    setActiveLine(activeLine[0]);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  if (loadingLines || loadingReservations) return <Spinner />;

  const menuItemsOfActiveLine = new Set(
    activeLine.menuItems.map((menuItem) => menuItem.name)
  );

  const reservationsFilteredByLineCategory = reservations
    .map((reservation) => {
      const filteredItems = reservation.items.filter(
        (item) =>
          menuItemsOfActiveLine.has(item.itemName) && item.open && !item.delete
      );

      const itemsWithoutHold = filteredItems.filter((item) => !item.hold);
      const itemsWithHold = filteredItems.filter((item) => item.hold);

      return {
        ...reservation,
        items: [...itemsWithoutHold, ...itemsWithHold],
      };
    })
    .filter((reservation) => reservation.items.length > 0);

  const totalPages = Math.ceil(reservationsFilteredByLineCategory.length / 8);

  //if the current page is bigger the the totalPages so make the page to be the last avialble page
  if (reservationsFilteredByLineCategory.length > 0 && page > totalPages)
    setPage(totalPages);

  const currentReservations = reservationsFilteredByLineCategory.slice(
    (page - 1) * 8,
    page * 8
  );

  return (
    <div className='page-fixed-position-sidebar'>
      <div className='reservations-page-container'>
        <div className='reservations-page-container-select-line'>
          <SelectMUI
            menuItemCategories={lines}
            handleChange={handleChangeLine}
            activeCategory={activeLine.name}
          />
        </div>
        <div className='reservations-page-reservations-container'>
          {currentReservations.map((reservation) => (
            <div className='reservations-page-reservations-container-box'>
              <div className='reservations-page-reservations-container-box-title-content'>
                <h6>Table Number : {reservation.table.number}</h6>
                <Clock
                  starterString={'Time passed : '}
                  createdAt={reservation.createdAt}
                />
              </div>
              <div className='reservations-page-reservations-container-box-menu-items'>
                {reservation.items.map((item) => (
                  <div
                    className='reservations-page-reservations-container-box-menu-item-content'
                    key={item.id}
                  >
                    <div className='reservations-page-reservations-container-box-menu-item-name'>
                      <p>
                        {item.itemName}{' '}
                        {item.hold && (
                          <div className='reservations-page-reservations-container-box-menu-item-hold'>
                            <i className='bx bxs-hand'></i>
                          </div>
                        )}
                        {item.fire && (
                          <div className='reservations-page-reservations-container-box-menu-item-fire'>
                            <i className='bx bxs-hand'></i>
                            <Clock
                              starterString={' '}
                              createdAt={item.fireTimestamp}
                            />
                          </div>
                        )}
                      </p>
                    </div>
                    <div className='reservations-page-reservations-container-box-menu-item-removed-ingridents'>
                      {item.ingredientsRemoved.map(
                        (ingredientRemoved, index) => (
                          <p key={index}>Without {ingredientRemoved}</p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className='delete-edit-menu-item-box-paginiation'>
          <Stack spacing={2} alignItems='center'>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color='primary'
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

Reservations.propTypes = {
  lines: PropTypes.array.isRequired,
  reservations: PropTypes.array.isRequired,
  getReservations: PropTypes.func.isRequired,
  getAllLines: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lines: state.lines.lines,
  reservations: state.reservation.reservations,
  loadingReservations: state.reservation.loadingReservations,
});

export default connect(mapStateToProps, { getReservations, getAllLines })(
  Reservations
);
