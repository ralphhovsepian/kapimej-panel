import React from 'react';
import { Box, Container } from '@mui/material';
import SummaryCards from '../components/SummaryCards.tsx';
import TopSales from '../components/TopSales.tsx';
const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>

      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <SummaryCards />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ width: '100%' }}>
            <TopSales />
            </Box>
            <Box sx={{ flex: 1 }}>
              {/* Additional widgets can be added here */}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
