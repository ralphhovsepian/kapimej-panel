import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
} from '@mui/material';
import { Plus } from 'lucide-react';

const salesData = [
  { country: 'US', flag: '🇺🇸', plan: '5GB', sales: 1234, name: 'United States' },
  { country: 'CN', flag: '🇨🇳', plan: '3GB', sales: 876, name: 'China' },
  { country: 'IT', flag: '🇮🇹', plan: '10GB', sales: 656, name: 'Italy' },
  { country: 'TR', flag: '🇹🇷', plan: '1GB', sales: 432, name: 'Turkey' },
  { country: 'FR', flag: '🇫🇷', plan: '1GB', sales: 223, name: 'Germany' },
];

const TopSales: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid #eee',
        marginTop: 5
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Top Sales</Typography>
      </Box>
      <List>
        {salesData.map((item, index) => (
          <ListItem
            key={item.country}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              py: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {index + 1}
              </Typography>
              <span style={{ fontSize: '20px' }}>{item.flag}</span>
              <Box>
                <Typography variant="body2">{item.country} • {item.plan}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.name}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {item.sales}
              <Typography
                component="span"
                variant="caption"
                color="text.secondary"
                sx={{ ml: 0.5 }}
              >
                SALES
              </Typography>
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TopSales;

