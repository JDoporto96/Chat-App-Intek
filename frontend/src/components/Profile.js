import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './auth'

function Profile() {
    const auth = useAuth();
    const navigate = useNavigate();
    const handleLogout = () =>{
        auth.logout();
        navigate('/');
    }
  return (
    <div>
        <h1>Welcome {auth.user}</h1>
        <button onClick={handleLogout}> Log Out</button>
        <button><Link to='/dashboard'>Dashboard</Link></button>
    </div>
    
  )
}

export default Profile