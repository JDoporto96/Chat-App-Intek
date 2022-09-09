import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login';


export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      
    </Routes>
  </BrowserRouter>
  );
}