import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InputField from '../../../../components/common/InputField';
import Dropdown from '../../../../components/common/Dropdown';
import Checkbox from '../../../../components/common/Checkbox';
import Button from '../../../../components/common/Button';

import { addMenuItem, editMenuItem } from '../../../../actions/menu';
import IconButton from '../../../../components/common/IconButton';

import '../../../../components/common/List.css';

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
    <div className='stick-to-bottom-container'>
      <div className='title' style={{ marginTop: '20px' }}>
        <h1>Add or Edit Menu Item</h1>
      </div>
      <div style={{ marginTop: '45px' }}>
        <InputField
          name={'name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name *'
          icon={'bx bx-user'}
        />
        <InputField
          name={'price'}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Price *'
          icon={'bx bx-money'}
        />
        <InputField
          name={'image'}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder='Image URL'
          icon={'bx bx-image-add'}
        />
        <Dropdown
          selected={category}
          setSelected={setCategory}
          options={menuItemCategories.map((item) => item.name)}
          title={'Choose Category'}
        />
        <div className='elements-in-one-line'>
          <InputField
            name={'ingredient'}
            value={ingredientInput.name}
            onChange={handleIngridientInputChange}
            placeholder='Add Ingredient'
            icon={'bx bx-list-plus'}
          />
          <IconButton
            icon={'bx bx-plus-circle'}
            onClick={handleAddIngredient}
          />
        </div>
        <ul className='modern-list'>
          {ingredients.map((ingredient, index) => (
            <li key={index} className='modern-list-item'>
              <span className='modern-item-name'>{ingredient.name}</span>
              <IconButton
                icon={'bx bx-trash red'}
                onClick={() => handleRemoveIngredient(index)}
              />
              <div style={{ marginLeft: '15px' }}>
                <Checkbox
                  label='Can Remove'
                  checked={ingredient.canRemove}
                  onChange={() => handleCheckboxChange(ingredient.name)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='stick-to-bottom-element'>
        <Button onClick={handleSubmit} title={'Submit'} />
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
