import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  ShoppingCart,
//   Package,
  People,
  SimCard
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, active: true, path: "/dashboard" },
  { text: 'Purchases', icon: <ShoppingCart />, active: false, path: "/purchases" },
  { text: 'Users', icon: <People />, active: false, path: "/users" },
  { text: 'eSIMs', icon: <SimCard />, active: false, path: "/esims" },
];

const Sidebar = () => {
  const [activePath, setActivePath] = useState("/dashboard");

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        width: 280, 
        height: '100vh',
        borderRight: '1px solid #eee',
        backgroundColor: '#f8fafc',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
       
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Kapimej
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Admin Panel
          </Typography>
        </Box>
      </Box>
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Link to={item.path} style={{ textDecoration: 'none', borderRadius: 1,
                mb: 0.5,
                color: "inherit",
                '&:hover': {
                }, }}>
            <ListItemButton
            >
              <ListItemIcon >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Sidebar;
