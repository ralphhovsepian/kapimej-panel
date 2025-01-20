import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material"
import { ArrowLeft, Mail, Calendar, DollarSign, Edit, Info } from "lucide-react"
import { supabase } from "../lib/supabaseClient.ts"

interface UserData {
  user_id: string
  created_at: string
  email: string
  full_name: string | null
  avatar_url: string | null
  wallet_balance: string
  updated_at: string
}

interface EsimOrder {
  order_id: string
  provider: string
  order_reference: string
  price: string
  plan_id: string
  currency: string
  transaction_id: string
  quantity: string
  status: string
  created_at: string
}

interface Transaction {
  transaction_id: string
  type: string
  amount: string
  currency: string
  transaction_date: string
  order_id: string | null
  payment_method: string
  external_transaction_id: string | null
  status: string
  payment_id: string | null
}

interface EsimDetails {
  esim_id: string
  order_id: string
  activation_code: string
  assigned_data_limit: string
  data_used: string
  validity_start: string | null
  validity_end: string | null
  status: string
  last_updated: string
  initial_quantity: string | null
  remaining_quantity: string | null
}

const UserDetails: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [esimOrders, setEsimOrders] = useState<EsimOrder[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editedUser, setEditedUser] = useState<UserData | null>(null)
  const [selectedEsimDetails, setSelectedEsimDetails] = useState<EsimDetails | null>(null)
  const [esimDetailsDialogOpen, setEsimDetailsDialogOpen] = useState(false)

  useEffect(() => {
    fetchUserData()
    fetchEsimOrders()
    fetchTransactions()
  }, [id])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("profiles").select("*").eq("user_id", id).single()

      if (error) throw error

      if (data) {
        setUserData(data)
        setEditedUser(data)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchEsimOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("esim_orders")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false })

      if (error) throw error

      if (data) {
        setEsimOrders(data)
      }
    } catch (error) {
      console.error("Error fetching eSIM orders:", error)
    }
  }

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", id)
        .order("transaction_date", { ascending: false })

      if (error) throw error

      if (data) {
        setTransactions(data)
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)
    }
  }

  const fetchEsimDetails = async (orderId: string) => {
    try {
      const { data, error } = await supabase.from("esim_details").select("*").eq("order_id", orderId).single()

      if (error) throw error

      if (data) {
        setSelectedEsimDetails(data)
        setEsimDetailsDialogOpen(true)
      }
    } catch (error) {
      console.error("Error fetching eSIM details:", error)
    }
  }

  const handleEditClick = () => {
    setEditDialogOpen(true)
  }

  const handleEditDialogClose = () => {
    setEditDialogOpen(false)
  }

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setEditedUser((prev) => ({
      ...prev!,
      [name]: value,
    }))
  }

  const handleEditSubmit = async () => {
    if (!editedUser) return

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          ...editedUser,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", id)
        console.log(error)
      if (error) throw error

      setUserData(editedUser)
      setEditDialogOpen(false)
    } catch (error) {
      console.error("Error updating user data:", error)
    }
  }

  const handleEsimDetailsClose = () => {
    setEsimDetailsDialogOpen(false)
    setSelectedEsimDetails(null)
  }

  if (loading) {
    return <Typography>Loading user data...</Typography>
  }

  if (!userData) {
    return <Typography>User not found</Typography>
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Button onClick={() => navigate("/users")} startIcon={<ArrowLeft size={18} />} sx={{ mb: 2 }}>
            Back to Users
          </Button>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h4" fontWeight="bold">
              User Details
            </Typography>
            <Button variant="contained" startIcon={<Edit size={18} />} onClick={handleEditClick}>
              Edit User
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <Avatar
                  src={userData.avatar_url || "/placeholder.svg?height=120&width=120"}
                  alt={userData.full_name || "User"}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h5" fontWeight="bold">
                  {userData.full_name || "No Name"}
                </Typography>
              </Box>
              <Box sx={{ "& > div": { mb: 2 } }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Mail size={18} style={{ marginRight: 8 }} />
                  <Typography variant="body2">{userData.email}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Account Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Calendar size={18} style={{ marginRight: 8 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Registration Date
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {new Date(userData.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <DollarSign size={18} style={{ marginRight: 8 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Wallet Balance
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        ${Number.parseFloat(userData.wallet_balance).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                eSIM Orders
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Provider</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {esimOrders.map((order) => (
                      <TableRow key={order.order_id}>
                        <TableCell>{order.order_id}</TableCell>
                        <TableCell>{order.provider}</TableCell>
                        <TableCell>{`${order.price} ${order.currency}`}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Info size={16} />}
                            onClick={() => fetchEsimDetails(order.order_id)}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Transactions
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Transaction ID</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.transaction_id}>
                        <TableCell>{transaction.transaction_id}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{`${transaction.amount} ${transaction.currency}`}</TableCell>
                        <TableCell>{transaction.status}</TableCell>
                        <TableCell>{new Date(transaction.transaction_date).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} aria-labelledby="edit-user-dialog-title">
        <DialogTitle id="edit-user-dialog-title">Edit User Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="full_name"
            label="Full Name"
            type="text"
            fullWidth
            value={editedUser?.full_name || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={editedUser?.email || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            name="wallet_balance"
            label="Wallet Balance"
            type="number"
            fullWidth
            value={editedUser?.wallet_balance || ""}
            onChange={handleEditInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={esimDetailsDialogOpen} onClose={handleEsimDetailsClose} aria-labelledby="esim-details-dialog-title">
        <DialogTitle id="esim-details-dialog-title">eSIM Details</DialogTitle>
        <DialogContent>
          {selectedEsimDetails && (
            <Box>
              <Typography>
                <strong>eSIM ID:</strong> {selectedEsimDetails.esim_id}
              </Typography>
              <Typography>
                <strong>Activation Code:</strong> {selectedEsimDetails.activation_code}
              </Typography>
              <Typography>
                <strong>Assigned Data Limit:</strong> {selectedEsimDetails.assigned_data_limit} MB
              </Typography>
              <Typography>
                <strong>Data Used:</strong> {selectedEsimDetails.data_used} MB
              </Typography>
              <Typography>
                <strong>Validity Start:</strong>{" "}
                {selectedEsimDetails.validity_start
                  ? new Date(selectedEsimDetails.validity_start).toLocaleString()
                  : "N/A"}
              </Typography>
              <Typography>
                <strong>Validity End:</strong>{" "}
                {selectedEsimDetails.validity_end ? new Date(selectedEsimDetails.validity_end).toLocaleString() : "N/A"}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedEsimDetails.status}
              </Typography>
              <Typography>
                <strong>Last Updated:</strong> {new Date(selectedEsimDetails.last_updated).toLocaleString()}
              </Typography>
              <Typography>
                <strong>Initial Quantity:</strong> {selectedEsimDetails.initial_quantity || "N/A"}
              </Typography>
              <Typography>
                <strong>Remaining Quantity:</strong> {selectedEsimDetails.remaining_quantity || "N/A"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEsimDetailsClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UserDetails

