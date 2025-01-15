import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  InputBase,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Select,
  MenuItem,
  SelectChangeEvent,
  Pagination,
  Modal,
  TextField,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Search, Filter, Plus, Globe, Clock, Wifi, X } from 'lucide-react';

// Mock eSIM data
const initialESIMData = [
  { id: 'ESIM001', country: { code: 'US', name: 'United States', flag: '🇺🇸' }, data: '5GB', duration: '30 Days', price: '29.99', status: 'Active' },
  { id: 'ESIM002', country: { code: 'FR', name: 'France', flag: '🇫🇷' }, data: '10GB', duration: '14 Days', price: '24.99', status: 'Active' },
  { id: 'ESIM003', country: { code: 'JP', name: 'Japan', flag: '🇯🇵' }, data: '3GB', duration: '7 Days', price: '19.99', status: 'Inactive' },
  { id: 'ESIM004', country: { code: 'DE', name: 'Germany', flag: '🇩🇪' }, data: '8GB', duration: '30 Days', price: '34.99', status: 'Active' },
  { id: 'ESIM005', country: { code: 'IT', name: 'Italy', flag: '🇮🇹' }, data: '6GB', duration: '14 Days', price: '22.99', status: 'Active' },
  { id: 'ESIM006', country: { code: 'ES', name: 'Spain', flag: '🇪🇸' }, data: '4GB', duration: '7 Days', price: '17.99', status: 'Inactive' },
];

const Esims: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [esimData, setESIMData] = useState(initialESIMData);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingESIM, setEditingESIM] = useState<(typeof initialESIMData)[0] | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newESIM, setNewESIM] = useState({
    id: '',
    country: { code: '', name: '', flag: '' },
    data: '',
    duration: '',
    price: '',
    status: 'Active',
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(Number(event.target.value));
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleEditClick = (esim: (typeof initialESIMData)[0]) => {
    setEditingESIM(esim);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditingESIM(null);
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingESIM) {
      const updatedESIMs = esimData.map((esim) =>
        esim.id === editingESIM.id ? editingESIM : esim
      );
      setESIMData(updatedESIMs);
      handleEditModalClose();
    }
  };

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editingESIM) {
      setEditingESIM({
        ...editingESIM,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
    setNewESIM({
      id: '',
      country: { code: '', name: '', flag: '' },
      data: '',
      duration: '',
      price: '',
      status: 'Active',
    });
  };

  const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = `ESIM${String(esimData.length + 1).padStart(3, '0')}`;
    const addedESIM = { ...newESIM, id: newId };
    setESIMData([...esimData, addedESIM]);
    handleAddModalClose();
  };

  const handleAddInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name.startsWith('country.')) {
      const countryField = name.split('.')[1];
      setNewESIM(prev => ({
        ...prev,
        country: { ...prev.country, [countryField]: value }
      }));
    } else {
      setNewESIM(prev => ({ ...prev, [name]: value }));
    }
  };

  const filteredESIMs = esimData.filter((esim) => {
    const matchesSearch = esim.country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          esim.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || esim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedESIMs = filteredESIMs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold">eSIMs</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
                border: '1px solid #e0e0e0',
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search eSIMs"
                inputProps={{ 'aria-label': 'search esims' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Search color="#666" size={20} style={{ marginRight: 8 }} />
            </Paper>
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              displayEmpty
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </Box>
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            sx={{ borderRadius: 2 }}
            onClick={handleAddClick}
          >
            Add New eSIM
          </Button>
        </Box>

        <Grid container spacing={3}>
          {paginatedESIMs.map((esim) => (
            <Grid item xs={12} sm={6} md={4} key={esim.id}>
              <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      {esim.country.flag} {esim.country.name}
                    </Typography>
                    <Chip
                      label={esim.status}
                      size="small"
                      sx={{
                        backgroundColor: esim.status === 'Active' ? '#E8F5E9' : '#FFEBEE',
                        color: esim.status === 'Active' ? '#2E7D32' : '#C62828',
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    {esim.id}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Wifi size={18} style={{ marginRight: 8 }} />
                    <Typography variant="body2">{esim.data}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Clock size={18} style={{ marginRight: 8 }} />
                    <Typography variant="body2">{esim.duration}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Globe size={18} style={{ marginRight: 8 }} />
                    <Typography variant="body2">{esim.country.code}</Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Typography variant="h6" color="primary">
                    ${esim.price}
                  </Typography>
                  <Button size="small" variant="outlined" onClick={() => handleEditClick(esim)}>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Items per page:
            </Typography>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              size="small"
            >
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
            </Select>
          </Box>
          <Pagination
            count={Math.ceil(filteredESIMs.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>

      <Modal
        open={editModalOpen}
        onClose={handleEditModalClose}
        aria-labelledby="edit-esim-modal"
        aria-describedby="modal-to-edit-esim-details"
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
              Edit eSIM
            </Typography>
            <Button onClick={handleEditModalClose} sx={{ minWidth: 'auto', p: 0.5 }}>
              <X size={24} />
            </Button>
          </Box>
          {editingESIM && (
            <form onSubmit={handleEditSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Data"
                name="data"
                value={editingESIM.data}
                onChange={handleEditInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Duration"
                name="duration"
                value={editingESIM.duration}
                onChange={handleEditInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Price"
                name="price"
                value={editingESIM.price}
                onChange={handleEditInputChange}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={editingESIM.status}
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
          )}
        </Box>
      </Modal>

      <Modal
        open={addModalOpen}
        onClose={handleAddModalClose}
        aria-labelledby="add-esim-modal"
        aria-describedby="modal-to-add-new-esim"
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
              Add New eSIM
            </Typography>
            <Button onClick={handleAddModalClose} sx={{ minWidth: 'auto', p: 0.5 }}>
              <X size={24} />
            </Button>
          </Box>
          <form onSubmit={handleAddSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Country Name"
              name="country.name"
              value={newESIM.country.name}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Country Code"
              name="country.code"
              value={newESIM.country.code}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Country Flag (Emoji)"
              name="country.flag"
              value={newESIM.country.flag}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Data"
              name="data"
              value={newESIM.data}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Duration"
              name="duration"
              value={newESIM.duration}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Price"
              name="price"
              value={newESIM.price}
              onChange={handleAddInputChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="add-status-label">Status</InputLabel>
              <Select
                labelId="add-status-label"
                name="status"
                value={newESIM.status}
                onChange={handleAddInputChange as any}
                label="Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleAddModalClose} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Add eSIM
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Esims;
