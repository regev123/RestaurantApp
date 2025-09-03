import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TableCard.css';
import Button from './Button';

const TableCard = ({ tables }) => {
  const navigate = useNavigate();

  return (
    <div className='cards-container'>
      {tables.map((table) => (
        <div
          key={table._id} /* Add a unique key for each table */
          className={`table-card ${
            !table.available ? 'not-available' : 'available'
          }`}
        >
          <h2>Table {table.number}</h2>
          <p>Seats: {table.seats}</p>
          <Button
            onClick={() => navigate(`/tables/reservation/${table._id}`)}
            title={'Select'}
          />
        </div>
      ))}
    </div>
  );
};

export default TableCard;
