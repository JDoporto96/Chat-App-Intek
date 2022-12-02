import React, { useState, useEffect} from "react";
import ChatInput from "./ChatInput";
import { Box } from "@mui/system";
import { Grid, Typography} from "@mui/material";
import GroupSetting from "./Buttons/GroupSetting";
import { useMutation } from "@apollo/client";
import SEND_MESSAGE from "../../graphql/mutations/sendMessage";
import Messages from "../Messages";
import { useSelector } from "react-redux";


export default function ChatContainer({ contacts, currentChat}) {
  const {currentUser} = useSelector((state) => {
    return state.currentUser
  });

  const [chatName, setChatName]=useState("");
  
  const [sendMsg,] = useMutation(SEND_MESSAGE);

  
  useEffect(()=>{
    if(currentChat.name){
      setChatName(currentChat.name)
    }else{
      const contactId=currentChat.members.find(m => m!== currentUser._id)
      const contactName = contacts.find(contact => contact._id===contactId).username
      setChatName(contactName)
    }
  },[currentChat])


  const handleSendMsg = async (msg)=>{
    const input ={
      conversationId: currentChat._id,
      message: msg
    }

    sendMsg({variables: {input}});

  };

  return (
    <React.Fragment>
      <Box
      p={2}
      sx={{
        width:"100%",
        backgroundColor: 'primary.light',
        display:"flex",
        flexDirection:"row"
      }}
      >
          
            <Typography variant="h5" gutterBottom
            sx={{
              flexGrow:1
            }}
            >
              {chatName}
            </Typography>
          

            {currentChat.name?(
                <GroupSetting currentChat={currentChat}/>
              ) : <></> 
            }
            
          
          
       
        
      </Box>

      <Grid container spacing={4} alignItems="center">
        <Grid id="chat-window" xs={12}
        sx={{
          height: "70vh"
          }} item>
          <Messages contacts={contacts} currentChat={currentChat}/>
          <ChatInput handleSendMsg={handleSendMsg} />   
        </Grid>
        
      </Grid>
      
      
    </React.Fragment>
  );
}

