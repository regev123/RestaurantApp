import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import DeleteMenuItem from './Menu/DeleteMenuItem';
import AddMenuItem from './Menu/AddMenuItem';
import EditMenuItem from './Menu/EditMenuItem';
import MenuItemCategory from './Menu/MenuItemCategory';
import Spinner from '../layout/Spinner';
import { loadMenuItems, loadMenuItemCategories } from '../../actions/menu';

const AdminMenuTab = ({
  loadingMenuItems,
  loadingCategories,
  loadMenuItemCategories,
  loadMenuItems,
}) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    loadMenuItemCategories();
    loadMenuItems();
  }, []);

  if (loadingMenuItems || loadingCategories) return <Spinner />;

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 12 }}>
        <Grid item xs={6}>
          <DeleteMenuItem />
        </Grid>

        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label='Categories'
          />
          {checked ? (
            <MenuItemCategory />
          ) : (
            <Fragment>
              <Divider>
                <Chip label='Add menu item' size='small' />
              </Divider>
              <AddMenuItem />
              <Divider>
                <Chip label='Edit menu item' size='small' />
              </Divider>
              <EditMenuItem />
            </Fragment>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

AdminMenuTab.prototype = {
  loadMenuItems: PropTypes.func.isRequired,
  loadMenuItemCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loadingMenuItems: state.menu.loadingMenuItems,
  loadingCategories: state.menu.loadingCategories,
});

export default connect(mapStateToProps, {
  loadMenuItems,
  loadMenuItemCategories,
})(AdminMenuTab);
