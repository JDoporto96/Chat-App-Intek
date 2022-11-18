import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Chat from '../components/Chat/Chat';
import MainBar from '../components/bar/MainBar';
import { useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';

const mdTheme = createTheme();

function DashboardContent() {

  return (
    <ThemeProvider theme={mdTheme}>
      <MainBar/>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '90vh',
            paddingTop:"1rem"

          }}
        >
          <Container maxWidth="100vh" >
          <Grid container>
              <Grid item xs={12} >
                
                
                <Chat/>
                
                
              </Grid>
              </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {

  const {currentUser} = useSelector((state) => {
    return state.currentUser
  });

  const {contacts} = useSelector((state) => {
    return state.contacts
  });

  const {isLogged} = useSelector((state) => {
    return state.auth
  });

  
  if(isLogged && currentUser && contacts){
    
    return <DashboardContent />;
  }
  console.log(isLogged)
  console.log("Returning to login")
  return <Navigate to="/login"/>
}