import React from 'react';
import { Link } from 'react-router-dom';
import './AdminLandingPage.css';

const AdminLandingPage = () => {
  return (
    <div class='page-fixed-position-sidebar'>
      <div class='admin-landing-page-container'>
        <div class='admin-landing-page-box-container'>
          <div class='admin-landing-page-box'>
            <img src='/images/round-table.png' alt=''></img>
            <h3>Tables Edit</h3>
            <p>
              Edit the restaurant tables, add a new table, and delete an
              existing table.
            </p>
            <a class='admin-landing-page-box-btn'>
              <Link class='text-white' to='/admin/tables'>
                Tables
              </Link>
            </a>
          </div>

          <div class='admin-landing-page-box'>
            <img src='/images/menu.png' alt=''></img>
            <h3>Menu Edit</h3>
            <p>
              Edit the restaurant menu items, add edit and delete a new item or
              category, view all existing items and category, change category
              order.
            </p>
            <a class='admin-landing-page-box-btn'>
              <Link class='text-white' to='/admin/menu'>
                Menu
              </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLandingPage;
