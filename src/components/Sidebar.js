import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, styled, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    marginTop: '64px',
    backgroundColor: '#d7d7d7',
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px',
    },
  },
}));

const Sidebar = ({ variant, open, onClose }) => {
  const theme = useTheme();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <StyledDrawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <List>
        <ListItem
          button
          component={RouterLink}
          to="/dashboard"
          onClick={onClose}
          selected={isActive('/dashboard')}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          component={RouterLink}
          to="/user-management"
          onClick={onClose}
          selected={isActive('/user-management')}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItem>
        <ListItem
          button
          component={RouterLink}
          to="/dynamic-form"
          onClick={onClose}
          selected={isActive('/dynamic-form')}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Dynamic Form" />
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
