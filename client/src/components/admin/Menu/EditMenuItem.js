import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editMenuItem } from '../../../actions/menu';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const EditMenuItem = ({
  wantedEditMenuItem,
  menuItemCategories,
  editMenuItem,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    ingredients: '',
    category: '',
    imageUrl: '',
  });
  const { name, price, ingredients, category, imageUrl } = formData;

  useEffect(() => {
    // This function will be called every time 'wantedEditMenuItem' changes

    if (wantedEditMenuItem) {
      setFormData({
        name: wantedEditMenuItem.name,
        price: wantedEditMenuItem.price,
        ingredients: wantedEditMenuItem.ingredients.join(', '),
        category: wantedEditMenuItem.category.name,
        imageUrl: wantedEditMenuItem.imageUrl,
      });
    }
  }, [wantedEditMenuItem]); // Dependency array with 'wantedEditMenuItem'

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editMenuItem(name, price, ingredients.split(','), category, imageUrl);
  };

  let elements = [];

  menuItemCategories.map((category) => {
    elements.push(
      <MenuItem key={category.name} value={category.name}>
        {category.name}
      </MenuItem>
    );
  });

  return (
    <Fragment>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <Box
          align='center'
          sx={{
            '& .MuiTextField-root': { m: 1, width: 0.45 },
          }}
        >
          <TextField
            id='name'
            name='name'
            label='name'
            value={name}
            onChange={(e) => onChange(e)}
            disabled
          />
          <TextField
            id='price'
            required
            name='price'
            label='price'
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
            margin='normal'
            required
            id='ingredients'
            label='ingredients'
            name='ingredients'
            onChange={(e) => onChange(e)}
            value={ingredients}
          />
          {
            <FormControl sx={{ m: 1, width: 0.45 }}>
              <InputLabel required>Category</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={category}
                label='category'
                name='category'
                onChange={(e) => onChange(e)}
                required
              >
                {elements}
              </Select>
            </FormControl>
          }
        </Box>
        <Box
          align='center'
          sx={{
            '& .MuiTextField-root': { m: 1, width: 0.92 },
          }}
        >
          <TextField
            margin='normal'
            id='ImageUrl'
            label='Image URL'
            name='ImageUrl'
            value={imageUrl}
            onChange={(e) => onChange(e)}
          />
        </Box>
        <Button
          align='center'
          type='submit'
          fullWidth
          color='success'
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Edit
        </Button>
      </Box>
    </Fragment>
  );
};

EditMenuItem.prototype = {
  editMenuItem: PropTypes.func.isRequired,
  wantedEditMenuItem: PropTypes.object.isRequired,
  menuItemCategories: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  wantedEditMenuItem: state.menu.wantedEditMenuItem,
  menuItemCategories: state.menu.menuItemCategories,
});

export default connect(mapStateToProps, { editMenuItem })(EditMenuItem);
