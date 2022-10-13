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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate} from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute, profilesAPIRoute } from "../utils/APIRoutes";
import Bar from '../components/bar/Bar';
import { useAuth } from '../components/Auth/auth';
import { useCurrentUser } from '../components/UserProvider/user';

const theme = createTheme();

export default function Login() {
  const navigate= useNavigate();
  const [values,setValues] = useState({
    email:"",
    password:"",
  });
    
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
        "Email and password are required",
        toastOptions
      );
      return false;
    }else if(email.length===""){
      toast.error(
        "Email and password are required",
        toastOptions
      );
      return false;
    }
    return true
  };
  
  const handleChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  };


  const auth = useAuth();
  const currentUser = useCurrentUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation()){
        const {email,password} = values;
            const {data} = await axios.post(loginRoute,{
                email,
                password,
            });
            if(data.status===false){
                toast.error(data.msg, toastOptions);
            }
            if(data.status ===true){
                auth.login(data.user._id);
                await axios.patch(profilesAPIRoute + `/${data.user._id}`,{
                  status:"Online"
                })
                const profile = await axios.get(profilesAPIRoute + `/${data.user._id}`)
                currentUser.userLogin(profile.data);
                navigate("/dashboard");
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
            Log In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} onChange={(e)=> handleChange(e)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
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
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <LinkUi href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </LinkUi>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer/>
    </ThemeProvider>
  );
}
