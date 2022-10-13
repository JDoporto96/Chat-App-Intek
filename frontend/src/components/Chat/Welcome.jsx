import { Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCurrentUser } from '../UserProvider/user';


export default function Welcome() {
  const currentUser=useCurrentUser();
  const[userName,setUserName] = useState("");
  useEffect(()=>{
    if(currentUser.currentUser){
      setUserName(currentUser.currentUser.username)
    }
  },[])

  return (
    <React.Fragment>
      <Typography variant="h2">
        Welcome, <span>{userName}!</span>
      </Typography>
      <Typography variant="h4">
        Please select a chat to Start messaging.
      </Typography>
    </React.Fragment>
  
      

  );
}