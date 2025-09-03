import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='pagination'>
      <button
        className='pagination-button'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &laquo;
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`pagination-number ${
            number === currentPage ? 'active' : ''
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        className='pagination-button'
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
