import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard.jsx';
import { Landing } from './components/Landing';
import { AuthProvider } from './components/Auth/auth.js';
import { RequireAuth } from './components/Auth/RequireAuth.js';
import { UserProvider } from './components/UserProvider/user.js';
import { ContactsProvider } from './components/ContactsProvider/contacts.js';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/apollo-client.js';
import { useTranslation} from 'react-i18next';



export default function App() {

  const lngs = {
    en: { nativeName: 'English' },
    es: { nativeName: 'Español' }
  };
  
  const { i18n } = useTranslation();

  
  return (
  <ApolloProvider client = {client}>
  <AuthProvider>
    <UserProvider>
      <ContactsProvider>
    <BrowserRouter>
    <div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
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
  </ApolloProvider>
  );
}