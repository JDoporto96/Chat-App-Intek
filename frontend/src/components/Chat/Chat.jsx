import React, { useEffect, useState, useRef} from "react";
import axios from "axios";
import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import { conversationsRoute, getMyGroupsRoute, socketsHost } from "../../utils/APIRoutes";
import { useCurrentUser } from "../UserProvider/user";
import { Container, } from "@mui/system";
import { Grid, Paper, Box, Typography  } from "@mui/material";
import {io} from 'socket.io-client';
import Groups from "./Groups";
import AddContact from "./Buttons/AddContact";
import AddGroup from "./Buttons/AddGroup";
import ContactRequests from "./Buttons/ContactRequests";
import { useContactsList } from "../ContactsProvider/contacts";
import ConversationsPanel from "./ConversationsPanel";



export default function Chat() {
  const currentUser = useCurrentUser().currentUser;
  const socket = useRef();
  const contacts = useContactsList().contacts;
  const [conversations, setConversations]= useState([]);
  const [groups, setGroups] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  

  useEffect(()=>{
    async function getConversations(){
        const response = await axios.get(conversationsRoute+currentUser._id,);
        setConversations(response.data)
    }
    getConversations();
    
  },[currentUser])

  useEffect(()=>{
    async function fetchData(){
        const response = await axios.post(getMyGroupsRoute,{
          userId: currentUser._id
        });
        
        setGroups(response.data)
    }
    fetchData();
    
  },[])

  useEffect(()=>{
    socket.current = io(socketsHost)
  },[])

  useEffect(()=>{
    if(currentUser){
      socket.current.emit("add-user", currentUser._id);
      // socket.current.on("get-users")
    }
  },[currentUser])


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
                        Contacts
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
                    
                    <Contacts currentUser={currentUser} contacts={contacts} changeChat={handleChatChange} conversations={conversations} />
                    
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
                       Groups
                      </Typography>
                      </Grid>

                      <Grid xs ={2} item>
                      <AddGroup contacts={contacts}/>
                      </Grid>
                    </Grid>


                  </Box>
                    
                    <Groups groups={groups} changeChat={handleChatChange} />
                    
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
                {currentChat === undefined ? (
                  <Welcome />
                  ) : (
                  <ChatContainer contacts={contacts} currentChat={currentChat} socket={socket} />
                )}
                </Box>
              </Paper>
            </Container>
          </Grid>
          <Grid item xs={2}>
            
            <Container>
              <Paper elevation={5}>
                    <ConversationsPanel conversations={conversations} changeChat={handleChatChange}/>

              </Paper>
              </Container>
          </Grid>


        </Grid>
      </Container>
      
    </>
  );
}


