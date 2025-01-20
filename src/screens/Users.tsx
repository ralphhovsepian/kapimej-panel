"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Box, Container, InputBase, Button, Modal, Typography, TextField } from "@mui/material"
import { Search, UserPlus, X } from "lucide-react"
import { UsersTable } from "../components/UsersTable.tsx"
import { supabase } from "../lib/supabaseClient.ts"

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    email: "",
    full_name: "",
    avatar_url: "",
    wallet_balance: "0",
  })
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [searchQuery])

  async function fetchUsers() {
    try {
      setLoading(true)
      let query = supabase.from("profiles").select("*")

      if (searchQuery) {
        query = query.or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`)
      }

      const { data, error } = await query.order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      if (data) {
        setUsers(data)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddClick = () => {
    setAddModalOpen(true)
  }

  const handleAddModalClose = () => {
    setAddModalOpen(false)
    setNewUser({
      email: "",
      full_name: "",
      avatar_url: "",
      wallet_balance: "0",
    })
  }

  const handleAddInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const { data, error } = await supabase.from("profiles").insert([newUser]).select()

      if (error) throw error

      if (data) {
        setUsers((prevUsers) => [...prevUsers, ...data])
        handleAddModalClose()
      }
    } catch (error) {
      console.error("Error adding new user:", error)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  p: 1,
                  mr: 1,
                  borderRadius: 1,
                  bgcolor: "primary.main",
                  color: "white",
                }}
              >
                <UserPlus size={20} />
              </Box>
              Users
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                px: 2,
                py: 1,
                borderRadius: 2,
                width: 300,
                border: "1px solid #eee",
              }}
            >
              <Search size={20} color="#666" style={{ marginRight: 8 }} />
              <InputBase
                placeholder="Search users..."
                sx={{ width: "100%" }}
                value={searchQuery}
                onChange={handleSearchChange}
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
        {loading ? <Typography>Loading users...</Typography> : <UsersTable users={users} />}
      </Container>

      <Modal
        open={addModalOpen}
        onClose={handleAddModalClose}
        aria-labelledby="add-user-modal"
        aria-describedby="modal-to-add-new-user"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" component="h2">
              Add New User
            </Typography>
            <Button onClick={handleAddModalClose} sx={{ minWidth: "auto", p: 0.5 }}>
              <X size={24} />
            </Button>
          </Box>
          <form onSubmit={handleAddSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={newUser.email}
              onChange={handleAddInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="full_name"
              value={newUser.full_name}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Avatar URL"
              name="avatar_url"
              value={newUser.avatar_url}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Wallet Balance"
              name="wallet_balance"
              type="number"
              value={newUser.wallet_balance}
              onChange={handleAddInputChange}
            />
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
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
  )
}

