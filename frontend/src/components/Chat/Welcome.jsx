import { Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCurrentUser } from '../UserProvider/user';
import { Trans } from "react-i18next";

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
        
      <Trans i18nkey="Welcome">Welcome</Trans>, <span>{userName}!</span>
      </Typography>
      <Typography variant="h4">
      <Trans i18nkey="WelcomeMsg">Please select a chat to Start messaging.</Trans>
        
      </Typography>
    </React.Fragment>
  
      

  );
}