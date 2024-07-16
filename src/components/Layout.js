import React from 'react';
import { AppBar, Toolbar, Typography, Container, styled, IconButton, useTheme, Hidden, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar'; 
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { Link, useNavigate } from 'react-router-dom'; 

const drawerWidth = 240;

const StyledAppBar = styled(AppBar)({
  zIndex: (theme) => theme.zIndex.drawer + 1,
  backgroundColor: "#343434",
});

const StyledMain = styled('main')(({ theme }) => ({
  flexGrow: 1,
  marginTop: '64px', 
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },
}));

const StyledToolbar = styled('div')(({ theme }) => theme.mixins.toolbar);

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); 
  };

  const handleLogoClick = () => {
    navigate('/dashboard'); 
  };

  return (
    <div style={{ display: 'flex' }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginRight: theme.spacing(2) }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <IconButton
            component="div"
            color="inherit"
            aria-label="logo"
            onClick={handleLogoClick}
            sx={{ marginRight: theme.spacing(2), padding: 0 }}
          >
            <img src="/logo.png" alt="Brand Logo" style={{ width: 'auto', height: 40, }} />
          </IconButton>
          <Hidden smDown implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: 'none' }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Button component={Link} to="/login" color="inherit" onClick={handleLogout} sx={{ marginLeft: 'auto', display: { xs: 'inline-flex', sm: 'inline-flex' } }}>
            Logout
          </Button>
        </Toolbar>
      </StyledAppBar>
      <Hidden mdUp>
        <Sidebar
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        />
      </Hidden>
      <Hidden smDown>
        <Sidebar
          variant="permanent"
          open
        />
      </Hidden>
      <StyledMain>
        <Container maxWidth="lg">
          {children}
        </Container>
      </StyledMain>
    </div>
  );
};

export default Layout;
