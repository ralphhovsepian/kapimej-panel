import React from 'react';
import { Box, Container, InputBase, Button } from '@mui/material';
import { Search, Filter, Download, ShoppingCart } from 'lucide-react';
import { PurchasesTable } from '../components/PurchasesTable.tsx';
import Sidebar from '../components/SideBar.tsx';
const Purchases = () => {
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  p: 1,
                  mr: 1,
                  borderRadius: 1,
                  bgcolor: 'primary.main',
                  color: 'white',
                }}
              >
                <ShoppingCart size={20} />
              </Box>
              Purchases
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                px: 2,
                py: 1,
                borderRadius: 2,
                width: 300,
                border: '1px solid #eee',
              }}
            >
              <Search size={20} color="#666" style={{ marginRight: 8 }} />
              <InputBase
                placeholder="Search..."
                sx={{ width: '100%' }}
              />
            </Box>
          </Box>
        </Box>
        <PurchasesTable />
      </Container>
    </Box>
  );
};

export default Purchases;

