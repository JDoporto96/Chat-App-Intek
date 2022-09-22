import React from 'react';
import{Link} from 'react-router-dom';

export const Landing = () => {
  return (
    <div>
        <h1>Landing</h1>
        
        <button><Link to='/login'>Log In</Link></button>
    </div>
  )
}
