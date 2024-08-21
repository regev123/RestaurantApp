import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './AddMenuItem.css';
import { addMenuItem, editMenuItem } from '../../../../actions/menu';

const InitialFormData = {
  name: '',
  price: '',
  ingredient: '',
  category: '',
  imageUrl: '',
};

const AddMenuItem = ({
  editMenuItemObject,
  setEditMenuItem,
  addMenuItem,
  editMenuItem,
  menuItemCategories,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState({
    name: '',
    canRemove: false,
  });

  useEffect(() => {
    if (editMenuItemObject !== null) {
      setName(editMenuItemObject.name);
      setPrice(editMenuItemObject.price);
      setImage(editMenuItemObject.imageUrl);
      setCategory(editMenuItemObject.category.name);
      setIngredients(editMenuItemObject.ingredients);
    } else {
      setName('');
      setPrice('');
      setImage('');
      setCategory('');
      setIngredients([]);
    }
  }, [editMenuItemObject]);

  const handleIngridientInputChange = (e) => {
    setIngredientInput({
      ...ingredientInput,
      name: e.target.value,
    });
  };

  const handleAddIngredient = () => {
    if (
      ingredientInput.name.trim() &&
      !ingredients.some(
        (ingredient) => ingredient.name === ingredientInput.name
      )
    ) {
      setIngredients([
        ...ingredients,
        {
          name: ingredientInput.name.trim(),
          canRemove: false,
        },
      ]);
      setIngredientInput({
        name: '',
        canRemove: false,
      });
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleCheckboxChange = (name) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.name === name
          ? { ...ingredient, canRemove: !ingredient.canRemove } // Toggle canRemove
          : ingredient
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMenuItemObject)
      await editMenuItem(name, price, ingredients, category, image);
    else await addMenuItem(name, price, ingredients, category, image);

    setEditMenuItem(null);
  };

  return (
    <div className='add-menu-item-container'>
      <div className='add-memu-item-container-title'>
        <h2>Add or Edit Menu Item</h2>
      </div>

      <div className='add-memu-item-container-form'>
        <div className='add-memu-item-container-form-group'>
          <TextField
            required
            label='Name *'
            variant='outlined'
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin='normal'
            disabled={editMenuItemObject !== null}
          />
        </div>
        <div className='add-memu-item-container-form-group'>
          <TextField
            required
            label='Price *'
            variant='outlined'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin='normal'
          />
        </div>
        <div className='add-memu-item-container-form-group'>
          <TextField
            label='Image URL'
            variant='outlined'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
            margin='normal'
          />
        </div>
        <div className='add-memu-item-container-form-group'>
          <FormControl fullWidth margin='normal'>
            <InputLabel>Category *</InputLabel>
            <Select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label='Category'
            >
              {menuItemCategories.map((menuItemCategory) => (
                <MenuItem
                  key={menuItemCategory.name}
                  value={menuItemCategory.name}
                  sx={{
                    color: 'black',
                    ':hover': { backgroundColor: '#71689c' },
                    '&.Mui-selected': {
                      backgroundColor: '#4b88ac',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: '#4b88ac',
                    },
                    '&.Mui-selected:focus': {
                      backgroundColor: '#4b88ac',
                    },
                  }}
                >
                  {menuItemCategory.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='add-memu-item-container-form-group'>
          <div className='add-memu-item-container-form-group-add-ingridient'>
            <TextField
              label='Add Ingredient'
              variant='outlined'
              value={ingredientInput.name}
              onChange={handleIngridientInputChange}
              margin='normal'
              sx={{ width: '80%' }}
            />
            <button onClick={handleAddIngredient}>
              <i class='bx bx-plus-circle'></i>
            </button>
          </div>
        </div>
        <div className='add-memu-item-container-form-group'>
          <ul className='add-memu-item-container-form-group-ingredients-list'>
            {ingredients.map((ingredient, index) => (
              <li
                key={index}
                className='add-memu-item-container-form-group-ingredient-item'
              >
                {ingredient.name}
                <div className='add-memu-item-container-form-group-ingredient-item-remove-btn'>
                  <button onClick={() => handleRemoveIngredient(index)}>
                    <i class='bx bx-trash'></i>
                  </button>
                </div>
                <div className='add-memu-item-container-form-group-ingredient-item-can-remove-checkbox'>
                  <input
                    type='checkbox'
                    checked={ingredient.canRemove}
                    onChange={() => handleCheckboxChange(ingredient.name)}
                  />
                  <span>Can remove</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='add-memu-item-container-form-group-submit'>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

AddMenuItem.propTypes = {
  addMenuItem: PropTypes.func.isRequired,
  editMenuItem: PropTypes.func.isRequired,
  menuItemCategories: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  menuItemCategories: state.menu.menuItemCategories,
});

export default connect(mapStateToProps, {
  addMenuItem,
  editMenuItem,
})(AddMenuItem);
