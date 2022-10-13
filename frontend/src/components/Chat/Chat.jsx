import React, { useEffect, useState, useRef} from "react";
import axios from "axios";
import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import { profilesAPIRoute, messagesHost, getMyGroupsRoute } from "../../utils/APIRoutes";
import { useCurrentUser } from "../UserProvider/user";
import { Container, } from "@mui/system";
import { Grid, Paper, Box, Typography  } from "@mui/material";
import {io} from 'socket.io-client';
import Groups from "./Groups";
import AddContact from "./Buttons/AddContact";
import AddGroup from "./Buttons/AddGroup";
import ContactRequests from "./Buttons/ContactRequests";


export default function Chat() {
  const currentUser = useCurrentUser();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);

  // const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  
  // useEffect(()=>{
  //   async function fetchData(){
  //       const response = await axios.get(`${profilesAPIRoute}/${auth.user}`);
  //       setCurrentUser(response.data);  
  //   }
  //   fetchData();
    
  // },[])

  useEffect(()=>{
    async function fetchData(){
        const {data} = await axios.get(`${profilesAPIRoute}/${currentUser.currentUser._id}/contacts`);
        const contactsList = data.map(contact=>{return{
          _id:contact._id,
          username:contact.username,
          isGroup: false
        }})
        setContacts(contactsList)   
    }
    fetchData();
    
  },[])




  useEffect(()=>{
    async function fetchData(){
        const response = await axios.post(getMyGroupsRoute,{
          userId: currentUser.currentUser._id
        });
        
        setGroups(response.data)
    }
    fetchData();
    
  },[])

  useEffect(()=>{
    if(currentUser){
      socket.current = io(messagesHost);
      socket.current.emit("add-user", currentUser.currentUser._id);
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
                  <Welcome />
                  ) : (
                  <ChatContainer contacts={contacts} currentChat={currentChat} socket={socket} />
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


