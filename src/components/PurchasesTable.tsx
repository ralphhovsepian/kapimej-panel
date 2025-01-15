import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Payment method images (you should replace these with actual logos)
const paymentMethods = {
  paypal: '/path-to-paypal.png',
  gpay: '/path-to-gpay.png',
  applepay: '/path-to-applepay.png',
  mastercard: '/path-to-mastercard.png',
  visa: '/path-to-visa.png',
  giropay: '/path-to-giropay.png',
};

const purchasesData = [
  {
    country: { code: 'FR', name: 'France', flag: '🇫🇷' },
    email: 'dolores.chambers@example.com',
    userId: 'dcdb920c-a9e0-4398-896d-a39228885dc8',
    esimId: 'esim_5GB_30D_FR_U',
    data: '5GB',
    id: '120NII01GIZJXGDNFQSK1OGJBLFHRUJT',
    date: '14 December, 2022 - 8:09:47 PM',
    price: '$6.80',
    paymentMethod: 'paypal'
  },
  {
    country: { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
    email: 'gd58kc2q7j@privaterelay.appleid.com',
    userId: '363dbd2d-03cc-429d-9794-fb37d140bfe2',
    esimId: 'esim_1GB_7D_TR_U',
    data: '5GB',
    id: 'CO0L7F2ZBYZODAJD1KX9S740JS5V88U3',
    date: '11 December, 2022 - 2:56:12 PM',
    price: '$1567.80',
    paymentMethod: 'gpay'
  },
  // Add more purchase data here...
];

interface PurchasesTableProps {
  data?: typeof purchasesData;
}

export const PurchasesTable: React.FC<PurchasesTableProps> = ({ data = purchasesData }) => {
  const [itemsPerPage, setItemsPerPage] = React.useState('7');

  const handleItemsPerPageChange = (event: SelectChangeEvent) => {
    setItemsPerPage(event.target.value);
  };

  return (
    <Paper elevation={0} sx={{ borderRadius: 2, border: '1px solid #eee' }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Country Code
                <Typography variant="caption" color="text.secondary" display="block">
                  User Id
                </Typography>
              </TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Delivery Email
              </TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>
                eSIM id
                <Typography variant="caption" color="text.secondary" display="block">
                  Amount Of Data
                </Typography>
              </TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Id
                <Typography variant="caption" color="text.secondary" display="block">
                  Date
                </Typography>
              </TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Price</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Payment Method</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span style={{ fontSize: '1.2rem' }}>{row.country.flag}</span>
                    <Box>
                      <Typography>{row.country.code}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.country.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    {row.userId}
                  </Typography>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  {row.esimId}
                  <Typography variant="caption" color="text.secondary" display="block">
                    {row.data}
                  </Typography>
                </TableCell>
                <TableCell>
                  {row.id}
                  <Typography variant="caption" color="text.secondary" display="block">
                    {row.date}
                  </Typography>
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <Box 
                    component="img" 
                    src={paymentMethods[row.paymentMethod as keyof typeof paymentMethods]}
                    alt={row.paymentMethod}
                    sx={{ height: 20 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2,
          p: 2,
          borderTop: '1px solid #eee',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Items per page:
          </Typography>
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            size="small"
            sx={{ 
              height: 32,
              '& .MuiSelect-select': { 
                py: 0.5,
                pr: 4,
              },
            }}
          >
            <MenuItem value="7">7</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="25">25</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" sx={{ border: '1px solid #eee' }}>
            <ChevronLeft size={18} />
          </IconButton>
          <IconButton size="small" sx={{ border: '1px solid #eee' }}>
            <ChevronRight size={18} />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

