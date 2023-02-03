import * as React from 'react';
import { useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkUi from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate} from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bar from '../components/bar/Bar';
import { useTranslation, Trans } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { client } from '../graphql/apollo-client';



export default function Login() {
 
  const {auth,infoMessage,contacts,currentUser,conversations} = useSelector((state) => {
    return state
  });


  const navigate= useNavigate();

  const dispatch = useDispatch();
  const [values,setValues] = useState({
    email:"",
    password:"",
  });
  const { t } = useTranslation();

  const toastOptions={
    position:"bottom-right",
    autoClose:5000,
    pauseOnHover:true,
    draggable:true,
  };

  const handleValidation =()=>{
    const {email,password} = values;
    if(password === ""){
      toast.error(
        t("Email and password are required"),
        toastOptions
      );
      return false;
    }else if(email.length===""){
      toast.error(
        t("Email and password are required"),
        toastOptions
      );
      return false;
    }
    return true
  };

  const handleChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await client.clearStore();
    if(handleValidation()){
        const {email,password} = values;
        const input = {
          email,
          password
        }
            dispatch({type:'LOGIN', payload: {input}})
      }
  };

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user-jwt')){
     
      dispatch({type: 'LOGGED', payload:{token:localStorage.getItem('chat-app-user-jwt')}})
    }
  })


  useEffect(()=>{
    if(infoMessage.error){
      toast.error(infoMessage.error,toastOptions)
    }

    if(infoMessage.info){
      toast.success(infoMessage.info,toastOptions)
    }

    dispatch({type:'RESET_MSG'})
      
  },[infoMessage, dispatch])


  useEffect(()=>{
    if(auth.token){
     
      dispatch({type: 'GET_CONTACTS'})
      dispatch({type: 'GET_CURRENT_USER'})
      dispatch({type:'GET_USER_CONVS'})
    }
  },[auth.token, dispatch])

  useEffect(()=>{
    if(auth.isLogged && currentUser.fetched && contacts.fetched && conversations.fetched){
      setTimeout(()=>{navigate("/dashboard")},800)
      
    }
  },[currentUser, contacts, auth, conversations])

  

  return (
    <>
      <Bar/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          <Trans i18nkey="Log in">Log in</Trans>
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} onChange={(e)=> handleChange(e)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("Email Address")}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("Password")}
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             <Trans i18nkey="Login">Log in</Trans>
            </Button>
            <Grid container>
              <Grid item>
                <Link to ="/register" >

                  <LinkUi variant="body2">
                  <Trans i18nkey="RegisterLink">
                  Don't have an account? Sign Up

                </Trans>
                </LinkUi>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer/>
    </>
  );
}
