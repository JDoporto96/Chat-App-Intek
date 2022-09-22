import React, {useState }from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login';
import Dashboard from './components/Dashboard.jsx';
import { Landing } from './components/Landing';
import logo from './assets/ISS_lgo.png';
import Profile from './components/Profile.js';
import { AuthProvider } from './components/auth.js';
import { RequireAuth } from './components/RequireAuth.js';



export default function App() {
  
  const [user, setUser] = useState(false);

  const handleLogin = e => {
    e.preventDefault();
    setUser(true);
  }


  return (
  <AuthProvider>
    <BrowserRouter>
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Landing/>} />
        <Route path='/dashboard' element={<RequireAuth> <Dashboard/> </RequireAuth> } />
        <Route path='/profile' element={<RequireAuth> <Profile/> </RequireAuth>} />
        
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  );
}