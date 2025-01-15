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
  Chip,
  Avatar,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ChevronLeft, ChevronRight, MoreVertical, Eye, Edit, Trash2, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const usersData = [
  {
    id: '1',
    name: 'John Cooper',
    email: 'john.cooper@example.com',
    status: 'Active',
    country: { code: 'US', name: 'United States', flag: '🇺🇸' },
    lastPurchase: '2023-12-24',
    totalSpent: '$1,234.56',
    registeredDate: '2023-01-15',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    status: 'Inactive',
    country: { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    lastPurchase: '2023-11-30',
    totalSpent: '$856.20',
    registeredDate: '2023-02-01',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: '3',
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@example.com',
    status: 'Active',
    country: { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    lastPurchase: '2023-12-28',
    totalSpent: '$2,567.80',
    registeredDate: '2023-03-15',
    avatar: '/placeholder.svg?height=40&width=40',
  },
];

interface UsersTableProps {
  data?: typeof usersData;
}

export const UsersTable: React.FC<UsersTableProps> = ({ data = usersData }) => {
  const [itemsPerPage, setItemsPerPage] = React.useState('7');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleItemsPerPageChange = (event: SelectChangeEvent) => {
    setItemsPerPage(event.target.value);
  };

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>, userId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleViewDetails = () => {
    if (selectedUserId) {
      // router.push(`/users/${selectedUserId}`);
      navigate(`/user/${selectedUserId}`);
    }
    handleActionClose();
  };

  const handleEditUser = () => {
    // Implement edit user functionality
    console.log(`Edit user with ID: ${selectedUserId}`);
    handleActionClose();
  };

  const handleDeleteUser = () => {
    // Implement delete user functionality
    console.log(`Delete user with ID: ${selectedUserId}`);
    handleActionClose();
  };

  return (
    <Paper elevation={0} sx={{ borderRadius: 2, border: '1px solid #eee' }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>User</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Status</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Country</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Last Purchase</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Total Spent</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Registered Date</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={user.avatar} alt={user.name} />
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    size="small"
                    sx={{
                      backgroundColor: user.status === 'Active' ? '#E8F5E9' : '#FFEBEE',
                      color: user.status === 'Active' ? '#2E7D32' : '#C62828',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span style={{ fontSize: '1.2rem' }}>{user.country.flag}</span>
                    <Box>
                      <Typography variant="body2">{user.country.code}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.country.name}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.lastPurchase}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {user.totalSpent}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.registeredDate}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={(event) => handleActionClick(event, user.id)}>
                    <MoreVertical size={16} />
                  </IconButton>
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleViewDetails()}>
          <ListItemIcon>
            <Eye size={16} />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEditUser}>
          <ListItemIcon>
            <Edit size={16} />
          </ListItemIcon>
          <ListItemText>Edit User</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteUser}>
          <ListItemIcon>
            <Trash2 size={16} />
          </ListItemIcon>
          <ListItemText>Delete User</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default UsersTable;