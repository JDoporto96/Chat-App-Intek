import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ResponsiveDrawer from '../components/Drawer';
import { LOGGED, RESET_MSG, USER_LOGIN } from '../utils/actions';

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

    dispatch(RESET_MSG())
      
  },[infoMessage])
  return (
    <>
      <Box>
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
     
      dispatch(USER_LOGIN())
    }
  },[auth.token, dispatch])

  if(localStorage.getItem('chat-app-user-jwt')){

    if(auth.isLogged && currentUser.fetched && contacts.fetched){
    
      return <DashboardContent />;
    }

    dispatch(LOGGED({token:localStorage.getItem('chat-app-user-jwt')}))

  }else{
    return <Navigate to="/login"/>
  }

}