import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign, CreditCard, Package, RefreshCw, RotateCcw, Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock user data
const initialUserData = {
  id: '1234567890',
  name: 'John Cooper',
  email: 'john.cooper@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main St, Anytown, USA 12345',
  country: { code: 'US', name: 'United States', flag: '🇺🇸' },
  registrationDate: '2023-01-15',
  totalSpent: '$1,234.56',
  status: 'Active',
  avatar: '/placeholder.svg?height=120&width=120',
};

// Mock eSIM purchase data
const esimPurchases = [
  {
    id: 'ESIM001',
    country: { code: 'FR', name: 'France', flag: '🇫🇷' },
    plan: '5GB / 30 Days',
    purchaseDate: '2023-12-24',
    expiryDate: '2024-01-23',
    status: 'Active',
    price: '$29.99',
  },
  {
    id: 'ESIM002',
    country: { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    plan: '10GB / 14 Days',
    purchaseDate: '2023-11-15',
    expiryDate: '2023-11-29',
    status: 'Expired',
    price: '$39.99',
  },
  {
    id: 'ESIM003',
    country: { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    plan: '3GB / 7 Days',
    purchaseDate: '2024-01-05',
    expiryDate: '2024-01-12',
    status: 'Active',
    price: '$19.99',
  },
];

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(initialUserData);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(userData);

  const handleRefresh = (esimId: string) => {
    console.log(`Refreshing eSIM: ${esimId}`);
    // Implement refresh logic here
  };

  const handleRefund = (esimId: string) => {
    console.log(`Refunding eSIM: ${esimId}`);
    // Implement refund logic here
  };

  const handleEditClick = () => {
    setEditedUser(userData);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserData(editedUser);
    setEditModalOpen(false);
    // Here you would typically send the updated user data to your backend
    console.log('Updated user data:', editedUser);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Button
            onClick={() => navigate('/users')}
            startIcon={<ArrowLeft size={18} />}
            sx={{ mb: 2 }}
          >
            Back to Users
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" fontWeight="bold">User Details</Typography>
            <Button
              variant="contained"
              startIcon={<Edit size={18} />}
              onClick={handleEditClick}
            >
              Edit User
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={userData.avatar}
                  alt={userData.name}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h5" fontWeight="bold">{userData.name}</Typography>
                <Chip
                  label={userData.status}
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: userData.status === 'Active' ? '#E8F5E9' : '#FFEBEE',
                    color: userData.status === 'Active' ? '#2E7D32' : '#C62828',
                    fontWeight: 500,
                  }}
                />
              </Box>
              <Box sx={{ '& > div': { mb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Mail size={18} style={{ marginRight: 8 }} />
                  <Typography variant="body2">{userData.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone size={18} style={{ marginRight: 8 }} />
                  <Typography variant="body2">{userData.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <MapPin size={18} style={{ marginRight: 8, marginTop: 4 }} />
                  <Typography variant="body2">{userData.address}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem', marginRight: 8 }}>{userData.country.flag}</span>
                  <Typography variant="body2">{userData.country.name}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Account Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Calendar size={18} style={{ marginRight: 8 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Registration Date</Typography>
                      <Typography variant="body1" fontWeight="medium">{userData.registrationDate}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DollarSign size={18} style={{ marginRight: 8 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Total Spent</Typography>
                      <Typography variant="body1" fontWeight="medium">{userData.totalSpent}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CreditCard size={18} style={{ marginRight: 8 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Payment Method</Typography>
                      <Typography variant="body1" fontWeight="medium">Visa ****4567</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Package size={18} style={{ marginRight: 8 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Total eSIMs</Typography>
                      <Typography variant="body1" fontWeight="medium">{esimPurchases.length}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>eSIM Purchases</Typography>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>eSIM ID</TableCell>
                      <TableCell>Country</TableCell>
                      <TableCell>Plan</TableCell>
                      <TableCell>Purchase Date</TableCell>
                      <TableCell>Expiry Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Refresh</TableCell>
                      <TableCell>Refund</TableCell>
                      <TableCell>Revoke</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {esimPurchases.map((esim) => (
                      <TableRow key={esim.id}>
                        <TableCell>{esim.id}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span style={{ fontSize: '1.2rem' }}>{esim.country.flag}</span>
                            <Typography variant="body2">{esim.country.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{esim.plan}</TableCell>
                        <TableCell>{esim.purchaseDate}</TableCell>
                        <TableCell>{esim.expiryDate}</TableCell>
                        <TableCell>
                          <Chip
                            label={esim.status}
                            size="small"
                            sx={{
                              backgroundColor: esim.status === 'Active' ? '#E8F5E9' : '#FFEBEE',
                              color: esim.status === 'Active' ? '#2E7D32' : '#C62828',
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>
                        <TableCell>{esim.price}</TableCell>
                        <TableCell>
                          <Tooltip title="Refresh eSIM">
                            <IconButton
                              size="small"
                              onClick={() => handleRefresh(esim.id)}
                              sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': { bgcolor: 'primary.dark' },
                              }}
                            >
                              <RefreshCw size={16} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Refund eSIM">
                            <IconButton
                              size="small"
                              onClick={() => handleRefund(esim.id)}
                              sx={{
                                bgcolor: 'error.main',
                                color: 'white',
                                '&:hover': { bgcolor: 'error.dark' },
                              }}
                            >
                              <RotateCcw size={16} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Refund eSIM">
                            <IconButton
                              size="small"
                              onClick={() => handleRefund(esim.id)}
                              sx={{
                                bgcolor: 'error.main',
                                color: 'white',
                                '&:hover': { bgcolor: 'error.dark' },
                              }}
                            >
                              <Trash size={16} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Modal
        open={editModalOpen}
        onClose={handleEditModalClose}
        aria-labelledby="edit-user-modal"
        aria-describedby="modal-to-edit-user-details"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Edit User Details
          </Typography>
          <form onSubmit={handleEditSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={editedUser.name}
              onChange={handleEditInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={editedUser.email}
              onChange={handleEditInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              name="phone"
              value={editedUser.phone}
              onChange={handleEditInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Address"
              name="address"
              value={editedUser.address}
              onChange={handleEditInputChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={editedUser.status}
                onChange={handleEditInputChange as any}
                label="Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleEditModalClose} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserDetails;
