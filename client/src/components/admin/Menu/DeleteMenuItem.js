import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../../layout/Spinner';
import {
  deleteMenuItem,
  addWantedEditMenuItemToState,
} from '../../../actions/menu';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const DeleteMenuItem = ({
  loading,
  menuItems,
  deleteMenuItem,
  addWantedEditMenuItemToState,
}) => {
  //when press edit i want to make state property that will contain the change model that i want to do it
  if (loading) {
    return <Spinner />;
  }

  const handleDelete = (id) => {
    deleteMenuItem({ id });
  };

  const handleEdit = (name, price, ingredients, category, imageUrl) => {
    addWantedEditMenuItemToState(name, price, ingredients, category, imageUrl);
  };

  let elements = [];
  menuItems.map((menuItems) => {
    elements.push(
      <Paper
        key={menuItems.name}
        sx={{
          p: 1,
          m: 1,
          width: 1,
          flexGrow: 1,
          boxShadow: 12,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <Img
              sx={{ width: 200, height: 128 }}
              alt='complex'
              src={
                menuItems.imageUrl
                  ? menuItems.imageUrl
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVQfxEyRp184pVTen_MQe-LEqhLZxhWAWj9A&s'
              }
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant='subtitle1'>
                  {menuItems.name}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {menuItems.ingredients.join(', ')}
                </Typography>
                <Typography variant='subtitle1' sx={{ color: 'green' }}>
                  {menuItems.price}$
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='error'
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(menuItems._id)}
              >
                Delete
              </Button>
              <Button
                variant='contained'
                color='success'
                startIcon={<SendIcon />}
                onClick={() =>
                  handleEdit(
                    menuItems.name,
                    menuItems.price,
                    menuItems.ingredients,
                    menuItems.category,
                    menuItems.imageUrl
                  )
                }
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  });

  return <Fragment>{elements}</Fragment>;
};

DeleteMenuItem.prototype = {
  loading: PropTypes.bool,
  menuItems: PropTypes.object.isRequired,
  addWantedEditMenuItemToState: PropTypes.func.isRequired,
  deleteMenuItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.menu.loading,
  menuItems: state.menu.menuItems,
});

export default connect(mapStateToProps, {
  deleteMenuItem,
  addWantedEditMenuItemToState,
})(DeleteMenuItem);
