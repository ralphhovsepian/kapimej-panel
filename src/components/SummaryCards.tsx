import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import {
  Person,
  ShoppingCart,
  Timeline,
  AttachMoney,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';

const summaryData = [
  {
    title: 'Total registrations',
    value: '23,120',
    change: '+5%',
    trend: 'up',
    icon: <Person />,
    subtitle: 'More than last month',
  },
  {
    title: 'Total orders',
    value: '10,200',
    change: '-2%',
    trend: 'down',
    icon: <ShoppingCart />,
    subtitle: 'Less orders than last month',
  },
  {
    title: 'Conversion rate %',
    value: '8%',
    change: '+1%',
    trend: 'up',
    icon: <Timeline />,
    subtitle: 'More than last month',
  },
  {
    title: 'Amount in Sales',
    value: '$8,500',
    change: '-1%',
    trend: 'down',
    icon: <AttachMoney />,
    subtitle: 'Less than last month',
  },
];

const SummaryCards = () => {
  return (
    <Grid container spacing={2}>
      {summaryData.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.title}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid #eee',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  backgroundColor: '#f0f7ff',
                  borderRadius: 1,
                  p: 1,
                  mr: 1,
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="subtitle2" color="text.secondary">
                {item.title}
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {item.value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {item.trend === 'up' ? (
                <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
              ) : (
                <TrendingDown sx={{ color: 'error.main', fontSize: 16 }} />
              )}
              <Typography
                variant="caption"
                color={item.trend === 'up' ? 'success.main' : 'error.main'}
              >
                {item.change}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.subtitle}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
