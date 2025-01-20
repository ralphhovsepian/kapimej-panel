import type React from "react"
import { useState } from "react"
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
  type SelectChangeEvent,
  Avatar,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { ChevronLeft, ChevronRight, MoreVertical, Eye, Edit, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"


export const UsersTable: React.FC= ({ users }) => {
  const [itemsPerPage, setItemsPerPage] = useState("7")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleItemsPerPageChange = (event: SelectChangeEvent) => {
    setItemsPerPage(event.target.value)
  }

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>, userId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedUserId(userId)
  }

  const handleActionClose = () => {
    setAnchorEl(null)
    setSelectedUserId(null)
  }

  const handleViewDetails = () => {
    if (selectedUserId) {
      navigate(`/user/${selectedUserId}`)
    }
    handleActionClose()
  }

  const handleEditUser = () => {
    console.log(`Edit user with ID: ${selectedUserId}`)
    handleActionClose()
  }

  const handleDeleteUser = () => {
    console.log(`Delete user with ID: ${selectedUserId}`)
    handleActionClose()
  }
  return (
    <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid #eee" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "text.secondary", fontWeight: 500 }}>User</TableCell>
              <TableCell sx={{ color: "text.secondary", fontWeight: 500 }}>Wallet Balance</TableCell>
              <TableCell sx={{ color: "text.secondary", fontWeight: 500 }}>Created At</TableCell>
              <TableCell sx={{ color: "text.secondary", fontWeight: 500 }}>Updated At</TableCell>
              <TableCell sx={{ color: "text.secondary", fontWeight: 500 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={user.avatar_url || "/placeholder.svg?height=40&width=40"}
                      alt={user.full_name || "User"}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {user.full_name || "N/A"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {Number.parseFloat(user.wallet_balance)}Դ
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{new Date(user.created_at).toLocaleDateString()}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{new Date(user.updated_at).toLocaleDateString()}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={(event) => handleActionClick(event, user.user_id)}>
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
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          p: 2,
          borderTop: "1px solid #eee",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Items per page:
          </Typography>
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            size="small"
            sx={{
              height: 32,
              "& .MuiSelect-select": {
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
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton size="small" sx={{ border: "1px solid #eee" }}>
            <ChevronLeft size={18} />
          </IconButton>
          <IconButton size="small" sx={{ border: "1px solid #eee" }}>
            <ChevronRight size={18} />
          </IconButton>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleActionClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleViewDetails}>
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
  )
}

export default UsersTable

