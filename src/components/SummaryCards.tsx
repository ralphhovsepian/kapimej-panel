

import type React from "react"
import { useEffect, useState } from "react"
import { Box, Paper, Typography, Grid, CircularProgress } from "@mui/material"
import { Person, ShoppingCart, Timeline, AttachMoney, TrendingUp, TrendingDown } from "@mui/icons-material"
import { supabase } from "../lib/supabaseClient.ts"

interface SummaryData {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
  subtitle: string
}

const SummaryCards: React.FC = () => {
  const [summaryData, setSummaryData] = useState<SummaryData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: profiles, error: profilesError } = await supabase.from("profiles").select("*")

        const { data: orders, error: ordersError } = await supabase.from("esim_orders").select("*")

        if (profilesError) throw profilesError
        if (ordersError) throw ordersError

        const totalRegistrations = profiles.length
        const totalOrders = orders.length
        const conversionRate = ((totalOrders / totalRegistrations) * 100).toFixed(2)
        const totalSales = orders.reduce((sum, order) => sum + Number.parseFloat(order.price), 0)

        const newSummaryData: SummaryData[] = [
          {
            title: "Total registrations",
            value: totalRegistrations.toString(),
            icon: <Person />,
          },
          {
            title: "Total orders",
            value: totalOrders.toString(),
            icon: <ShoppingCart />,
          },
          {
            title: "Conversion rate %",
            value: `${conversionRate}%`,
            icon: <Timeline />,
          },
          {
            title: "Amount in Sales",
            value: `AMD ${totalSales.toFixed(2)}`,
            icon: <AttachMoney />,
          },
        ]

        setSummaryData(newSummaryData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Grid container spacing={2}>
      {summaryData.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.title}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid #eee",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  backgroundColor: "#f0f7ff",
                  borderRadius: 1,
                  p: 1,
                  mr: 1,
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="subtitle2" color="text.secondary">
                {item.title}
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {item.value}
            </Typography>
            
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default SummaryCards

