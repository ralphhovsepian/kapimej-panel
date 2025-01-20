import React, { useEffect, useState } from 'react';
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
  Checkbox,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { Search, Plus, Globe, Clock, Wifi, X, Flag, ArrowLeft, View, Star } from 'lucide-react';
import { supabase } from '../lib/supabaseClient.ts';
import CountryFlag from '../components/CountryFlag.tsx';
import ReactCountryFlag from 'react-country-flag';

type ESIM = {
  country_code: string;
  network_provider: string;
  provider_plan_name: string;
  validity_days: number;
  top_up: boolean;
  networks_available: string[] | null;
  price: number;
  currency: string;
  created_at: string | null;
  updated_at: string | null;
  data_limit: number;
  unit: string;
  country_name: string;
  flag_code: string;
  best_value: boolean;
};

type EsimsProps = {
  country: string;
  onBack: () => void;
};

const Esims: React.FC<EsimsProps> = ({ country, onBack, countryData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [esimData, setESIMData] = useState<ESIM[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingESIM, setEditingESIM] = useState<ESIM | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  
  const [newESIM, setNewESIM] = useState<ESIM>({
    country_code: countryData.country_code,
    network_provider: 'EsimGo',
    provider_plan_name: '',
    validity_days: 0,
    top_up: false,
    networks_available: null,
    price: 0,
    currency: 'amd',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    data_limit: 0,
    unit: 'MB',
    country_name: countryData.country_name,
    flag_code: countryData.flag_code,
    best_value: false,
  });
  const [filteredESIMs, setFilteredESIMs] = useState<ESIM[]>([])
  

  useEffect(() => {
    getESIMs();
  }, [country]);

  async function getESIMs() {
    const { data, error } = await supabase
      .from("esims")
      .select()
      .eq('country_name', country);
    if (error) {
      console.error('Error fetching eSIMs:', error);
    } else {
      setESIMData(data || []);
    }
  }



  useEffect(() => {
    const filtered = esimData.filter((esim) => {
      const matchesSearch = esim.country_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            esim.esim_id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || (statusFilter === 'Active' && esim.data_limit > 0) || (statusFilter === 'Inactive' && esim.data_limit <= 0);
      return matchesSearch && matchesStatus;
    });
    setFilteredESIMs(filtered);
  }, [esimData, searchTerm, statusFilter]);

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

  const handleEditClick = (esim: ESIM) => {
    setEditingESIM(esim);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditingESIM(null);
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingESIM) {
      console.log(editingESIM);
      const { error } = await supabase
        .from('esims')
        .update(editingESIM)
        .eq('esim_id', editingESIM.esim_id);
      if (error) {
        console.error('Error updating eSIM:', error);
      } else {
        getESIMs(); // Refresh the data
        handleEditModalClose();
      }
    }
  };

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // check if it's network available, add it to setEditingESIM
    const networks_available = event.target.value.split(',').map(network => network.trim());
    if (event.target.name === 'networks_available') {
      setEditingESIM({
        ...editingESIM,
        networks_available: networks_available,
      });
    } else {
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
      country_code: '',
      network_provider: '',
      provider_plan_name: '',
      validity_days: 0,
      top_up: false,
      networks_available: null,
      price: 0,
      currency: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      data_limit: 0,
      unit: '',
      country_name: '',
      flag_code: '',
      best_value: false,
    });
  };

  console.log(newESIM);

  const handleAddSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { error } = await supabase
      .from('esims')
      .insert(newESIM);
    if (error) {
      console.error('Error adding new eSIM:', error);
    } else {
      getESIMs();
      handleAddModalClose();
    }
  };

  const handleAddInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const networks_available = event.target.value.split(',').map(network => network.trim());

    if (name.startsWith('country.')) {
      const countryField = name.split('.')[1];
      setNewESIM(prev => ({
        ...prev,
        [countryField]: value
      }));
    } else if (name === 'networks_available') {
      setNewESIM(prev => ({
        ...prev,
        networks_available: networks_available,
      }));
    } else {
      setNewESIM(prev => ({ ...prev, [name]: value }));
    }
  };

  // sort filteredESIMs by data_limit in ascending order
  const sortedESIMs = filteredESIMs.sort((a, b) => a.data_limit - b.data_limit);
  const paginatedESIMs = sortedESIMs.slice((page - 1) * itemsPerPage, page * itemsPerPage);


  const handleDeleteClick = async (esim: ESIM) => {
    const confirm = window.confirm('Are you sure you want to delete this eSIM?');
    if (confirm) {
      const { error } = await supabase
        .from('esims')
        .delete()
        .eq('esim_id', esim.esim_id);
      if (error) {
        console.error('Error deleting eSIM:', error);
      } else {
        getESIMs(); // Refresh the data
      }
    }
  };


  return (
    
    <Box sx={{ flexGrow: 1, bgcolor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button onClick={onBack} variant="outlined" sx={{ mr: 2 }}>
          <ArrowLeft size={18} />
        </Button>
        <Typography variant="h4" fontWeight="bold">
          eSIMs for {country.charAt(0).toUpperCase() + country.slice(1)} <ReactCountryFlag countryCode={countryData.flag_code} style={{ fontSize: '1.5em', marginLeft: '8px' }} cdnSuffix="svg" />
        </Typography>
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
            <Grid item xs={12} sm={6} md={4} key={esim.esim_id}>
              <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      {esim.country_name.charAt(0).toUpperCase() + esim.country_name.slice(1)}
                    </Typography>
                    <ReactCountryFlag countryCode={esim.flag_code} style={{ fontSize: '1.5em', marginLeft: '8px' }} cdnSuffix="svg" />
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    {esim.esim_id}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Wifi size={18} style={{ marginRight: 8 }} />
                    <Typography variant="body2">{esim.data_limit === -1 ? 'Unlimited' : `${esim.data_limit} ${esim.unit}`}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Clock size={18} style={{ marginRight: 8 }} />
                    <Typography variant="body2">{esim.validity_days} Days</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Globe size={18} style={{ marginRight: 8 }} />
                    <Typography variant="body2">{esim.country_code}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    <Star size={18} style={{ marginRight: 8 }} />
                    <Typography variant="body2">{esim.best_value ? 'Best Value' : 'Not Best Value'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    <Star size={18} style={{ marginRight: 8 }} />
                    <Typography variant="body2">{esim.provider_plan_name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    <Star size={18} style={{ marginRight: 8 }} />
                    <Typography variant="body2">{esim.networks_available}</Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Typography variant="h6" color="primary">
                    {esim.price} {esim.currency}
                  </Typography>
                 <view>
                 <Button size="small" variant="outlined" onClick={() => handleEditClick(esim)}>
                    Edit
                  </Button>
                  <Button size="small" variant="contained" onClick={() => handleDeleteClick(esim)} style={{ marginLeft: 8 }}>
                    Delete
                  </Button>
                  </view>
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
        style={{
          overflow: 'scroll',
        }}
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
                label="Data Limit"
                name="data_limit"
                type="number"
                value={editingESIM.data_limit}
                onChange={handleEditInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Unit"
                name="unit"
                value={editingESIM.unit}
                onChange={handleEditInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Validity Days"
                name="validity_days"
                type="number"
                value={editingESIM.validity_days}
                onChange={handleEditInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Price"
                name="price"
                type="number"
                value={editingESIM.price}
                onChange={handleEditInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Networks Available"
                name="networks_available"
                value={editingESIM.networks_available}
                onChange={handleEditInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Currency"
                name="currency"
                value={editingESIM.currency}
                onChange={handleEditInputChange}
              />
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleEditModalClose} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" onClick={handleEditSubmit}>
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

        style={{
          overflow: 'scroll',
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: '70%',
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
              name="country_name"
              value={newESIM.country_name}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Country Code"
              name="country_code"
              value={newESIM.country_code}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Country Flag (Emoji)"
              name="flag_code"
              value={newESIM.flag_code}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Network Provider"
              name="network_provider"
              value={newESIM.network_provider}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Provider Plan Name"
              name="provider_plan_name"
              value={newESIM.provider_plan_name}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Validity Days"
              name="validity_days"
              type="number"
              value={newESIM.validity_days}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Data Limit"
              name="data_limit"
              type="number"
              value={newESIM.data_limit}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Unit (e.g., GB, MB)"
              name="unit"
              value={newESIM.unit}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Networks Available"
              name="networks_available"
              value={newESIM.networks_available}
              onChange={handleAddInputChange}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={newESIM.best_value}
                  onChange={() => setNewESIM(prev => ({ ...prev, best_value: !prev.best_value }))}
                  name="best_value"
                />
              }
              label="Best Value"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Price"
              name="price"
              type="number"
              value={newESIM.price}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Currency"
              name="currency"
              value={newESIM.currency}
              onChange={handleAddInputChange}
            />
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

