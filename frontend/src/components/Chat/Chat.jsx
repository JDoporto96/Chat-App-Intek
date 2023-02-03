import React, { useState} from "react";
import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import { Container, } from "@mui/system";
import { Grid, Paper, Box, Typography  } from "@mui/material";
import Groups from "./Groups";
import AddContact from "./Buttons/AddContact";
import AddGroup from "./Buttons/AddGroup";
import ContactRequests from "./Buttons/ContactRequests";
import ConversationsPanel from "./ConversationsPanel";
import { Trans } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSubscription } from "@apollo/client";
import UPDATE_GROUP_SUB from "../../graphql/subscription/updateGroup";




export default function Chat() {

  const [currentChat, setCurrentChat] = useState(undefined);
  
  const {infoMessage,currentUser} = useSelector((state) => {
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



  useSubscription(UPDATE_GROUP_SUB, {
    onData:({data}) =>{
      if(currentChat !== undefined && data.data.updateGroup._id === currentChat._id  ){
        if(data.data.updateGroup.members.includes(currentUser.user._id)){
          setCurrentChat(data.data.updateGroup)
        }else{
          setCurrentChat(undefined)
        }
        
      }

      dispatch({type:'GET_USER_CONVS'})
  
    }
  })

 

      

    

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    
  };
  return (
    <>
      <Container maxWidth="100%">
        <Grid container>
          <Grid item xs={2}>
            
            <Container>
              <Paper elevation={5}>
              
                <Box
                
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height:"42.5vh"
                }}
                >
                  <Box
                  p={2}
                  sx={{
                    width: "100%",
                    backgroundColor: "primary.light",
                  }}>
                    <Grid container>
                      
                      <Grid xs ={8} item
                      >
                        <Typography variant ="h5">
                        <Trans i18nkey="Contacts">Contacts</Trans>
                        </Typography>
                      </Grid>
                      <Grid xs ={2} item>
                        <ContactRequests/>
                      </Grid>
                      <Grid xs ={2} item>
                        <AddContact/>
                      </Grid>
                    </Grid>
                     
                      
                      
                  </Box>
                    
                    <Contacts changeChat={handleChatChange} 
                    />
                    
                </Box>

                <Box
                
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height:"42.5vh"
                }}
                >
                  <Box
                  p={2}
                  sx={{
                    width: "100%",
                    backgroundColor: "primary.light"
                  }}>
                      
                     

                      <Grid container>
                      
                      <Grid xs ={10} item
                      >
                        <Typography variant ="h5">
                        <Trans i18nkey="Groups">Groups</Trans>
                      </Typography>
                      </Grid>

                      <Grid xs ={2} item>
                      <AddGroup />
                      </Grid>
                    </Grid>


                  </Box>
                    
                    <Groups changeChat={handleChatChange} />
                    
                </Box>
                
              </Paper>
            </Container>
          </Grid>
          <Grid item xs={8}>
            <Container>
              <Paper elevation={5}>
                <Box
                
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height:"85vh"
                }}
                >
                {currentChat === undefined ? 
                  <Welcome />
                  : 
                  <ChatContainer currentChat={currentChat} changeChat={handleChatChange}s />
                }
                </Box>
              </Paper>
            </Container>
          </Grid>
          <Grid item xs={2}>
            
            <Container>
              <Paper elevation={5}>
                    <ConversationsPanel 
                    changeChat={handleChatChange}/>

              </Paper>
              </Container>
          </Grid>


        </Grid>
      </Container>
      <ToastContainer/>
    </>
  );
}


