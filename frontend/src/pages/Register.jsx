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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { profilesAPIRoute, registerRoute } from "../utils/APIRoutes";
import Bar from '../components/bar/Bar';


const theme = createTheme();

export default function Register() {
    const navigate= useNavigate();
    const [values,setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });
    
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
                "Username should be longer than 3 characters",
                toastOptions
            );
            return false;
        }else if(email ===""){
            toast.error(
                "You need to provide an email",
                toastOptions
            );
            return false;
        }
        else if(password.length<6){
            toast.error(
                "Password must contain at least 6 characters",
                toastOptions
            );
            return false;

        }else if(password !== confirmPassword){
            toast.error(
                "Passwords should coincide.",
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
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password
            });
            if(data.status===false){
                toast.error(data.msg, toastOptions)
            }
            if(data.status ===true){
              const _id = data.user._id;
              axios.post(profilesAPIRoute,{
                _id,
                username
              })
              navigate("/login");
            }
            
       }
    };

  return (
    <ThemeProvider theme={theme}>
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
            Register
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
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
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
                  label="Password"
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
                  label="Confirm password"
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
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <LinkUI href="/login" variant="body2">
                  Already have an account? Sign in
                </LinkUI>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer/>
    </ThemeProvider>
    
  );
}