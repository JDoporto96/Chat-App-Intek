import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkUI from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bar from '../components/bar/Bar';
import { useTranslation, Trans } from "react-i18next";
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';




export default function Register() {
    const navigate= useNavigate();
    const {infoMessage} = useSelector((state) => {
      return state
    });
    const [values,setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true
    };

    const handleChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    };

    const handleValidation =()=>{
        const {username,email,password,confirmPassword} = values;
        if(username.length<3){
            toast.error(
                t("Username should be longer than 3 characters"),
                toastOptions
            );
            return false;
        }else if(email ==="" || !validator.isEmail(email)){
            toast.error(
                t("Invalid email address"),
                toastOptions
            );
            return false;
        }
        else if(password.length<6){
            toast.error(
                t("Password must contain at least 6 characters"),
                toastOptions
            );
            return false;

        }else if(password !== confirmPassword){
            toast.error(
                t("Passwords should coincide"),
                toastOptions
            );
            return false;
        } 
        return true
    };


    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(handleValidation()){
            const {username,email,password} = values;
            const input = {
              username, 
              email,
              password
            }
            dispatch({type:'REGISTER', payload: {input}})
            
            }
    };
  
  useEffect(()=>{
    if(infoMessage.error){
      toast.error(infoMessage.error,toastOptions)
      dispatch({type:'RESET_MSG'})
    }
    if(infoMessage.info){
      toast.success(infoMessage.info,toastOptions);
      dispatch({type:'RESET_MSG'});
      setTimeout(()=>{navigate('/login')},1000)
      
    }
    
      
  },[infoMessage, dispatch])

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
          <Trans i18nkey="Register">Register</Trans>
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} onChange={(e)=> handleChange(e)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label={t("Username")}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={t("Email Address")}
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={t("Password")}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label={t("Confirm password")}
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <Trans i18nkey="Register">Register</Trans>
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                <LinkUI  variant="body2">
                <Trans i18nkey="login-link">
                
                  Already have an account? Sign in
                
                </Trans>
                </LinkUI>
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