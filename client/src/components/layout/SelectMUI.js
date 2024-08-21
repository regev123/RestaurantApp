import React from 'react';

import './Sidebar.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const SelectMUI = ({ menuItemCategories, handleChange, activeCategory }) => {
  return (
    <Select
      labelId='demo-simple-select-label'
      id='demo-simple-select'
      value={activeCategory}
      label='Age'
      onChange={handleChange}
      sx={{
        background: '#15152c',
        color: 'white',
        width: '250px',
      }}
    >
      {menuItemCategories.map((category) => (
        <MenuItem
          sx={{
            background: '#15152c',
            color: 'white',
            ':hover': { backgroundColor: '#3d30aa' },
            '&.Mui-selected': {
              backgroundColor: '#1c383f',
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#1c383f',
            },
            '&.Mui-selected:focus': {
              backgroundColor: '#1c383f',
            },
          }}
          value={category.name}
        >
          {category.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectMUI;
