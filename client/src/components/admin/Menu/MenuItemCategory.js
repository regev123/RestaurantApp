import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {
  addMenuItemCategory,
  deleteMenuItemCategory,
  changeOrderMenuItemCategories,
} from '../../../actions/menu';

const MenuItemCategory = ({
  menuItemCategories,
  addMenuItemCategory,
  deleteMenuItemCategory,
  changeOrderMenuItemCategories,
}) => {
  const [categories, setCategories] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  // Update categories when menuItemCategories prop changes
  useEffect(() => {
    setCategories([...menuItemCategories]);
  }, [menuItemCategories]);

  const [newCategory, setNewCategory] = useState('');

  const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action will delete all the Menu Items under this category, Are
            you sure you want to proceed with this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={onConfirm} color='primary' autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (id) => {
    deleteMenuItemCategory({ id });
    setOpen(false);
  };

  const onClickAdd = () => {
    if (newCategory.trim() === '') {
      // Handle empty category name
      alert('Category name is required!');
      return;
    }

    const categoryExists = categories.some(
      (category) =>
        category.name.toLowerCase() === newCategory.trim().toLowerCase()
    );
    if (categoryExists) {
      alert('Category with that name is already exists!');
      return;
    }

    addMenuItemCategory(newCategory, categories.length + 1);
  };

  const onClickSubmitOrder = () => {
    changeOrderMenuItemCategories(categories);
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
    <Fragment>
      <Divider sx={{ m: 1 }}>
        <Chip label='Add menu item category' size='small' />
      </Divider>
      <Box sx={{ width: '100%' }}>
        <React.Fragment>
          <TextField
            id='name'
            name='name'
            required
            label='name'
            value={newCategory}
            onChange={(e) => onChange(e)}
            sx={{ width: 0.5 }}
          />
          <Button sx={{ mt: 1 }} onClick={onClickAdd}>
            <AddCircleIcon />
          </Button>
        </React.Fragment>
        <Divider sx={{ m: 1 }}>
          <Chip label='Change order or delete' size='small' />
        </Divider>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='order-list'>
            {(provided) => (
              <ul
                className='order-list'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {categories.map((item, index) => (
                  <Fragment>
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className='order-item'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.name}
                          <Button onClick={() => handleClick()}>
                            <DeleteOutlineIcon />
                          </Button>
                          <ConfirmationDialog
                            open={open}
                            onClose={handleClose}
                            onConfirm={() => handleConfirm(item._id)}
                          />
                        </li>
                      )}
                    </Draggable>
                  </Fragment>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
      <Button
        variant='contained'
        color='success'
        disabled={disableButton}
        onClick={() => onClickSubmitOrder()}
      >
        Submit Order Change
      </Button>
    </Fragment>
  );
};

MenuItemCategory.propTypes = {
  menuItemCategories: PropTypes.array.isRequired,
  addMenuItemCategory: PropTypes.func.isRequired,
  deleteMenuItemCategory: PropTypes.func.isRequired,
  changeOrderMenuItemCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  menuItemCategories: state.menu.menuItemCategories,
});

export default connect(mapStateToProps, {
  addMenuItemCategory,
  deleteMenuItemCategory,
  changeOrderMenuItemCategories,
})(MenuItemCategory);
