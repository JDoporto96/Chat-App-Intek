import { Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Trans } from "react-i18next";
import { useSelector } from "react-redux";

export default function Welcome() {
  const {user} = useSelector((state) => {
    return state.currentUser
  });

  const[userName,setUserName] = useState("");
  useEffect(()=>{
    if(user){
      setUserName(user.username)
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