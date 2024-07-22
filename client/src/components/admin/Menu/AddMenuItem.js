import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { addMenuItem } from '../../../actions/menu';

const AddMenuItem = ({ addMenuItem, menuItemCategories }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    ingredients: '',
    category: '',
    imageUrl: '',
  });

  const { name, price, ingredients, category, imageUrl } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    addMenuItem(name, price, ingredients.split(','), category, imageUrl);
  };

  let categoriesSelectElemet = [];

  menuItemCategories.map((category) => {
    categoriesSelectElemet.push(
      <MenuItem key={category.name} value={category.name}>
        {category.name}
      </MenuItem>
    );
  });

  return (
    <Fragment>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        onSubmit={(e) => handleAddMenuItem(e)}
      >
        <Box
          align='center'
          sx={{
            '& .MuiTextField-root': { m: 1, width: 0.45 },
          }}
        >
          <TextField
            required
            id='name'
            label='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
          <TextField
            required
            id='price'
            label='Price'
            name='price'
            value={price}
            onChange={(e) => onChange(e)}
          />
        </Box>

        <Box
          align='center'
          sx={{
            '& .MuiTextField-root': { m: 1, width: 0.45 },
          }}
        >
          <TextField
            id='ingredients'
            label='Ingredients'
            name='ingredients'
            value={ingredients}
            onChange={(e) => onChange(e)}
          />
          <FormControl sx={{ m: 1, width: 0.45 }}>
            <InputLabel required>Category</InputLabel>
            <Select
              id='category'
              value={category}
              name='category'
              onChange={(e) => onChange(e)}
              required
            >
              {categoriesSelectElemet}
            </Select>
          </FormControl>
        </Box>
        <Box
          align='center'
          sx={{
            '& .MuiTextField-root': { m: 1, width: 0.92 },
          }}
        >
          <TextField
            id='imageUrl'
            label='Image URL'
            name='imageUrl'
            value={imageUrl}
            onChange={(e) => onChange(e)}
          />
        </Box>
        <Button
          align='center'
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Add
        </Button>
      </Box>
    </Fragment>
  );
};

AddMenuItem.prototype = {
  addMenuItem: PropTypes.func.isRequired,
  menuItemCategories: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  menuItemCategories: state.menu.menuItemCategories,
});

export default connect(mapStateToProps, {
  addMenuItem,
})(AddMenuItem);
