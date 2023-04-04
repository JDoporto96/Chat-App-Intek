import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard.jsx';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/apollo-client.js';

import { Provider } from "react-redux";
import configureAppStore from "./redux/store";
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme.js';



export default function App() {

  
  return (
  <ApolloProvider client = {client}>
    <Provider store={configureAppStore()}>
      <ThemeProvider theme ={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          
          
            <Route path='/dashboard' element={<Dashboard/>} />
            
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </ApolloProvider>
  );
}