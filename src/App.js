import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './screens/Dashboard.tsx';
import AdminLogin from './screens/AdminLogin.tsx';
import Purchases from './screens/Purchases.tsx';
import Users from './screens/Users.tsx';
import UserDetails from './screens/UserDetails.tsx';
import Esims from './screens/Esims.tsx';
import Sidebar from './components/SideBar.tsx';


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
              <Route path="/esims" element={<Esims />} />
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
