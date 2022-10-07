import React, { useEffect, useState, useRef} from "react";
import axios from "axios";
import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import { profilesAPIRoute, messagesHost, getMyGroupsRoute } from "../../utils/APIRoutes";
import { useAuth } from "../Auth/auth";
import { Container, } from "@mui/system";
import { Grid, Paper, Box, Typography  } from "@mui/material";
import {io} from 'socket.io-client';
import Groups from "./Groups";

export default function Chat() {
  const auth = useAuth();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);

  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  
  useEffect(()=>{
    async function fetchData(){
        const response = await axios.get(`${profilesAPIRoute}/${auth.user}`);
        setCurrentUser(response.data);
        const contactsList = response.data.contacts.map(contact=>{return{
          _id:contact._id,
          name:contact.username,
          isGroup: false
        }})
        setContacts(contactsList)
        
    }
    fetchData();
    
  },[])

  useEffect(()=>{
    async function fetchData(){
        const response = await axios.post(getMyGroupsRoute,{
          userId: auth.user
        });
        setGroups(response.data)
    }
    fetchData();
    
  },[])

  useEffect(()=>{
    if(currentUser){
      socket.current = io(messagesHost);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser])


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    
  };

  return (
    <>
      <Container maxWidth="100%">
        <Grid container>
          <Grid item xs={3}>
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
                    backgroundColor: "primary.light"
                  }}>
                      <Typography variant ="h4">
                       Contacts
                      </Typography>
                  </Box>
                    
                    <Contacts contacts={contacts} changeChat={handleChatChange} />
                    
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
                      <Typography variant ="h4">
                       Groups
                      </Typography>
                  </Box>
                    
                    <Groups groups={groups} changeChat={handleChatChange} />
                    
                </Box>
                
              </Paper>
            </Container>
          </Grid>
          <Grid item xs={9}>
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
                  <Welcome currentUser={currentUser} />
                  ) : (
                  <ChatContainer contacts={contacts} currentChat={currentChat} currentUser={currentUser} socket={socket} />
                )}
                </Box>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}


