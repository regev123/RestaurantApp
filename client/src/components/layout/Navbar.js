import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth, logout }) => {
  const navigate = useNavigate();
  return (
    <AppBar position='static'>
      <Container maxWidth='xll'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 10,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Restaurant Name
          </Typography>

          <Box sx={{ flexGrow: 3, display: { xs: 'none', md: 'flex' } }}>
            {auth.user.role === 'admin' && (
              <Button
                key='admin'
                onClick={() => navigate('/admin')}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  boxShadow: 5,
                  fontFamily: 'monospace',
                  textTransform: 'none',
                  mr: 2,
                }}
              >
                Admin
              </Button>
            )}
            <Button
              key='tables'
              onClick={() => navigate('/tables')}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                boxShadow: 5,
                fontFamily: 'monospace',
                textTransform: 'none',
                mr: 2,
              }}
            >
              Tables
            </Button>

            <Button
              key='menu'
              onClick={() => navigate('/menu')}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                boxShadow: 5,
                fontFamily: 'monospace',
                textTransform: 'none',
              }}
            >
              Menu
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0.01 }}>
            <Avatar alt='Remy Sharp' src={auth.user.avatar} />
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key='tables'
              onClick={logout}
              href='/SignIn'
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                fontFamily: 'monospace',
                textTransform: 'none',
                fontWeight: 200,
              }}
            >
              Log out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Navbar.propTypes = {
  logout: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
