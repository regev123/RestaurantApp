import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import ConfirmDialog from '../../../../components/layout/ConfirmDialog';
import InputField from '../../../../components/common/InputField';
import IconButton from '../../../../components/common/IconButton';
import Button from '../../../../components/common/Button';

import {
  addMenuItemCategory,
  deleteMenuItemCategory,
  changeOrderMenuItemCategories,
} from '../../../../actions/menu';

import '../../../../components/common/List.css';

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
    <div className='stick-to-bottom-container'>
      <div className='title' style={{ marginTop: '20px' }}>
        <h1>Add new Category or Change Order</h1>
      </div>
      <div className='elements-in-one-line' style={{ marginTop: '25px' }}>
        <InputField
          name={'name'}
          value={newCategory}
          onChange={(e) => onChange(e)}
          placeholder={'Category Name *'}
        />
        <IconButton icon={'bx bx-plus-circle'} onClick={onClickAdd} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='order-list'>
          {(provided) => (
            <ul
              className='modern-list'
              style={{ maxHeight: '66vh' }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {categories.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <li
                      className='modern-list-item'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span className='modern-item-name'>{item.name}</span>
                      <IconButton
                        icon={'bx bx-trash red'}
                        onClick={() => {
                          setSelectedCategoryId(item._id);
                          setOpenDialog(true);
                        }}
                      />

                      <ConfirmDialog
                        isOpen={openDialog}
                        onCancel={() => setOpenDialog(false)}
                        onConfirm={() =>
                          handleConfirmDialog(selectedCategoryId)
                        }
                        title={'Category Delete.'}
                        message={
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
      <div className='stick-to-bottom-element'>
        <Button
          onClick={() => onClickSubmitOrder()}
          title={'Change order'}
          disabled={disableButton}
        />
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
