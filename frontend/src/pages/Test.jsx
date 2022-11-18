import { Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Test() {
  const currentUser = useSelector((state) => {
    return state.currentUser
  });

  const contacts = useSelector((state) => {
    return state.contacts
  });
  const dispatch = useDispatch();

  const handleClick = (e) =>{
    e.preventDefault();
    
    dispatch({
      type: 'GET_CURRENT_USER',
    });
    console.log(currentUser)

    dispatch({
      type: 'GET_CONTACTS',
        });
        console.log(contacts)
  }

  const handleLogOut=(e)=>{
    e.preventDefault();

    dispatch({
      type:"LOGOUT"
    })

    console.log(currentUser)
    console.log(contacts)
  }
  // if(contacts && currentUser){
  //   return <Navigate to="/dashboard"/>
  // }
  return (
    <>
    <Button
      onClick={handleClick}
    > Change State</Button>

    <Button
      onClick={handleLogOut}
    > Log Out</Button>
    
    </>
    
  )
}

export default Test