import React, { useEffect, useState} from "react";
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
import { useLazyQuery } from "@apollo/client";
import GET_USER_CONV from "../../graphql/queries/getUserConversations";
import { Trans } from "react-i18next";
import { useSelector } from "react-redux";


export default function Chat() {
  const {currentUser} = useSelector((state) => {
    return state.currentUser
  });

  const {contacts} = useSelector((state) => {
    return state.contacts
  });
  const [conversations, setConversations]= useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [getUserConversations, ] = useLazyQuery(GET_USER_CONV);

  useEffect(()=>{
    async function getConversations(){
        const {data} = await getUserConversations({variables:{userId:currentUser._id}})
        setConversations(data.getUserConversations)
        
    }
    getConversations();
    
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
                    
                    <Contacts changeChat={handleChatChange} conversations={conversations} />
                    
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
                      <AddGroup contacts={contacts}/>
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
                {currentChat === undefined ? (
                  <Welcome />
                  ) : (
                  <ChatContainer contacts={contacts} currentChat={currentChat} />
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


