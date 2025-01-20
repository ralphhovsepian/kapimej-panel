import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import Dashboard from './screens/Dashboard.tsx';
import AdminLogin from './screens/AdminLogin.tsx';
import Purchases from './screens/Purchases.tsx';
import Users from './screens/Users.tsx';
import UserDetails from './screens/UserDetails.tsx';
import Sidebar from './components/SideBar.tsx';
import ESIMManagement from './screens/EsimManagement.tsx';

export const supabase = createClient("https://lwoeotjpbppofgbfqjyv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3b2VvdGpwYnBwb2ZnYmZxanl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1NjE3ODYsImV4cCI6MjA0MzEzNzc4Nn0.m5h0J8DhYqmuHgfAiifMB2LYwxKmFBhiHq7pT8VWWzM");



function App() {
  const isAuthenticated = true;
  return (
    <Router>
      {isAuthenticated ? (
        <div className="app-container">
          <div className="main-content" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <Sidebar />

            {/* <Navbar /> */}
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/:id" element={<UserDetails />} />
              <Route path="/esims" element={<ESIMManagement />} />
              {/* <Route path="/settings" element={<Settings />} /> */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
