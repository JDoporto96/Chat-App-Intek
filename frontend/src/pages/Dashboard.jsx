import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ResponsiveDrawer from '../components/Drawer';

function DashboardContent() {
  const {infoMessage} = useSelector((state) => {
    return state
  });
  const dispatch = useDispatch();
  const toastOptions={
    position:"bottom-right",
    autoClose:5000,
    pauseOnHover:true,
    draggable:true,
  };
  
  React.useEffect(()=>{
    if(infoMessage.error){
      toast.error(infoMessage.error,toastOptions)
    }

    if(infoMessage.info){
        toast.success(infoMessage.info,toastOptions)
        
    }

    dispatch({type:'RESET_MSG'})
      
  },[infoMessage])
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
       
                <ResponsiveDrawer/>
                
      </Box>
      <ToastContainer/>
    </>
  );
}

export default function Dashboard() {

  const {auth,currentUser,contacts} = useSelector((state) => {
    return state
  });
  const dispatch = useDispatch();


  React.useEffect(()=>{
    if(auth.token){
     
      dispatch({type: 'GET_CONTACTS'})
      dispatch({type: 'GET_CURRENT_USER'})
      dispatch({type:'GET_USER_CONVS'})
    }
  },[auth.token, dispatch])

  if(localStorage.getItem('chat-app-user-jwt')){

    if(auth.isLogged && currentUser.fetched && contacts.fetched){
    
      return <DashboardContent />;
    }

    dispatch({type: 'LOGGED', payload:{token:localStorage.getItem('chat-app-user-jwt')}})

  }else{
    return <Navigate to="/login"/>
  }

}