import React, { useState } from 'react';
import {
  Box,
  Container,
  InputBase,
  Button,
  Modal,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Search, Filter, UserPlus, X } from 'lucide-react';
import { UsersTable } from "../components/UsersTable.tsx"

const Users = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    status: 'Active',
    country: { code: '', name: '', flag: '' },
  });

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
    setNewUser({
      name: '',
      email: '',
      status: 'Active',
      country: { code: '', name: '', flag: '' },
    });
  };

  const handleAddInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name.startsWith('country.')) {
      const countryField = name.split('.')[1];
      setNewUser(prev => ({
        ...prev,
        country: { ...prev.country, [countryField]: value }
      }));
    } else {
      setNewUser(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setNewUser(prev => ({ ...prev, status: event.target.value }));
  };

  const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send the new user data to your backend
    console.log('New user to be added:', newUser);
    handleAddModalClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
                <UserPlus size={20} />
              </Box>
              Users
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
                placeholder="Search users..."
                sx={{ width: '100%' }}
              />
            </Box>
            <Button
              variant="contained"
              startIcon={<UserPlus size={18} />}
              sx={{ borderRadius: 2 }}
              onClick={handleAddClick}
            >
              Add New User
            </Button>
          </Box>
        </Box>
        <UsersTable />
      </Container>

      <Modal
        open={addModalOpen}
        onClose={handleAddModalClose}
        aria-labelledby="add-user-modal"
        aria-describedby="modal-to-add-new-user"
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" component="h2">
              Add New User
            </Typography>
            <Button onClick={handleAddModalClose} sx={{ minWidth: 'auto', p: 0.5 }}>
              <X size={24} />
            </Button>
          </Box>
          <form onSubmit={handleAddSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={newUser.name}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={newUser.email}
              onChange={handleAddInputChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="add-status-label">Status</InputLabel>
              <Select
                labelId="add-status-label"
                name="status"
                value={newUser.status}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Country Name"
              name="country.name"
              value={newUser.country.name}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Country Code"
              name="country.code"
              value={newUser.country.code}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Country Flag (Emoji)"
              name="country.flag"
              value={newUser.country.flag}
              onChange={handleAddInputChange}
            />
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleAddModalClose} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Add User
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Users;
