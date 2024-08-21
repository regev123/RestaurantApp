import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TextField from '@mui/material/TextField';

import ConfirmationDialog from '../../../../components/layout/ConfirmationDialog';

import {
  addMenuItemCategory,
  deleteMenuItemCategory,
  changeOrderMenuItemCategories,
} from '../../../../actions/menu';

import './MenuItemCategory.css';

const MenuItemCategory = ({
  menuItemCategories,
  addMenuItemCategory,
  deleteMenuItemCategory,
  changeOrderMenuItemCategories,
  loading,
}) => {
  const [categories, setCategories] = useState(menuItemCategories || []);
  const [disableButton, setDisableButton] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    setCategories(menuItemCategories || []);
  }, [menuItemCategories]);

  const handleConfirmDialog = (id) => {
    const indexToDelete = categories.findIndex((item) => item._id === id);
    if (indexToDelete !== -1) {
      const updatedCategories = [...categories];
      updatedCategories.splice(indexToDelete, 1);
      setCategories(updatedCategories);
      deleteMenuItemCategory({ id });
    }
    setOpenDialog(false);
  };

  const onClickAdd = () => {
    if (newCategory.trim() === '') {
      alert('Category name is required!');
      return;
    }

    const categoryExists = categories.some(
      (category) =>
        category.name.toLowerCase() === newCategory.trim().toLowerCase()
    );
    if (categoryExists) {
      alert('Category with that name already exists!');
      return;
    }

    addMenuItemCategory(newCategory, categories.length + 1);
    setNewCategory('');
  };

  const onClickSubmitOrder = () => {
    changeOrderMenuItemCategories(categories);
    setDisableButton(true);
  };

  const onChange = (e) => setNewCategory(e.target.value);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = [...categories];
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    reorderedItems.forEach((category, index) => {
      category.order = index + 1;
    });

    setCategories(reorderedItems);
    setDisableButton(false);
  };

  return (
    <div className='menu-item-category-conatiner'>
      <div className='menu-item-category-conatiner-title'>
        <h2>Add new Category + Change Order</h2>
      </div>
      <div className='menu-item-category-container-form-group'>
        <div className='menu-item-category-container-form-group-add-category'>
          <TextField
            id='name'
            name='name'
            required
            label='Category Name *'
            value={newCategory}
            onChange={(e) => onChange(e)}
            sx={{ width: '80%' }}
          />
          <button onClick={onClickAdd}>
            <i class='bx bx-plus-circle'></i>
          </button>
        </div>
      </div>
      <div className='menu-item-category-container-form-group'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='order-list'>
            {(provided) => (
              <ul
                className='menu-item-category-container-form-group-category-list'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {categories.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        className='menu-item-category-container-form-group-category-item'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.name}
                        <div className='menu-item-category-container-form-group-category-item-remove-btn'>
                          <button
                            onClick={() => {
                              setSelectedCategoryId(item._id);
                              setOpenDialog(true);
                            }}
                          >
                            <i class='bx bx-trash'></i>
                          </button>
                        </div>
                        <ConfirmationDialog
                          open={openDialog}
                          onClose={() => setOpenDialog(false)}
                          onConfirm={() =>
                            handleConfirmDialog(selectedCategoryId)
                          }
                          text={
                            'This action will delete all the Menu Items under this category. Are you sure you want to proceed with this action?'
                          }
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className='menu-item-category-container-form-group-submit'>
        <button disabled={disableButton} onClick={() => onClickSubmitOrder()}>
          Submit Order Change
        </button>
      </div>
    </div>
  );
};

MenuItemCategory.propTypes = {
  menuItemCategories: PropTypes.array.isRequired,
  addMenuItemCategory: PropTypes.func.isRequired,
  deleteMenuItemCategory: PropTypes.func.isRequired,
  changeOrderMenuItemCategories: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  menuItemCategories: state.menu.menuItemCategories,
  loading: state.menu.loading,
});

export default connect(mapStateToProps, {
  addMenuItemCategory,
  deleteMenuItemCategory,
  changeOrderMenuItemCategories,
})(MenuItemCategory);
