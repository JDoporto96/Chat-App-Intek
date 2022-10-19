import React, {useState }from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard.jsx';
import { Landing } from './components/Landing';
import Profile from './components/Profile.js';
import { AuthProvider } from './components/Auth/auth.js';
import { RequireAuth } from './components/Auth/RequireAuth.js';
import { UserProvider } from './components/UserProvider/user.js';
import { ContactsProvider } from './components/ContactsProvider/contacts.js';



export default function App() {
  
 


  return (
  <AuthProvider>
    <UserProvider>
      <ContactsProvider>
    <BrowserRouter>
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Landing/>} />
        <Route path='/dashboard' element={<RequireAuth> <Dashboard/>  </RequireAuth> } />
        
      </Routes>
    </BrowserRouter>
    </ContactsProvider>
    </UserProvider>
  </AuthProvider>
  );
}