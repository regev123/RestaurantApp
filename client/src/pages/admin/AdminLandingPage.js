import React from 'react';
import Card from '../../components/common/Card';

const cardData = [
  {
    image: '/images/round-table.png',
    name: 'Tables Edit',
    description:
      'Edit the restaurant tables, add a new table, and delete an existing table.',
    link: '/admin/tables',
    linkText: 'Tables',
  },
  {
    image: '/images/menu.png',
    name: 'Menu Edit',
    description:
      'Edit the restaurant menu items, add, edit, and delete items or categories, view all existing items and categories, and change category order.',
    link: '/admin/menu',
    linkText: 'Menu',
  },
  {
    image: '/images/lines.png',
    name: 'Line Edit',
    description:
      'Add or delete restaurant lines, and assign menu items to each line.',
    link: '/admin/line',
    linkText: 'Lines',
  },
];

const AdminLandingPage = () => {
  return (
    <div className='page-fixed-position-navbar'>
      <div className='cards-container'>
        {cardData.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            name={card.name}
            description={card.description}
            link={card.link}
            linkText={card.linkText}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminLandingPage;
