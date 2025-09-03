import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ image, name, description, link, linkText }) => {
  return (
    <div className='card'>
      <div className='card-image-container'>
        <img src={image} alt={name} className='card-image' />
      </div>
      <div className='card-content'>
        <h2 className='card-name'>{name}</h2>
        <p className='card-description'>{description}</p>
        <Link to={link} className='card-link'>
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default Card;
