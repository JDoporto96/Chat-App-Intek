import React, { useState, useEffect} from "react";
import ChatInput from "./ChatInput";
import { Box } from "@mui/system";
import { Divider, Grid, Typography} from "@mui/material";
import GroupSetting from "./Buttons/GroupSetting";
import { useMutation } from "@apollo/client";
import SEND_MESSAGE from "../../graphql/mutations/sendMessage";
import Messages from "../Messages";
import { useSelector } from "react-redux";


export default function ChatContainer({currentChat, changeChat}) {
  const {currentUser, contacts} = useSelector((state) => {
    return state
  });

  const [chatName, setChatName]=useState("");
  
  const [sendMsg,] = useMutation(SEND_MESSAGE);

  
  useEffect(()=>{
    if(currentChat.name){
      setChatName(currentChat.name)
    }else{
      const contactId = currentChat.members.find(m => m!== currentUser.user._id);
      const contact = contacts.contactList.find(contact => contact._id===contactId)
      const name = contact? contact.username: contactId
      setChatName(name)
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
    <>
      <Box
      p={2}
      sx={{
        width:"100%",
        backgroundColor:"lightgrey",             
        display:"flex",
        flexDirection:"row"
      }}
      >
          
        <Typography variant="h5" gutterBottom
            noWrap={true}
            sx={{
              flexGrow:1,
              
            }}
            >
              {chatName}
        </Typography>
          

        {currentChat.isGroup?(
          <GroupSetting currentChat={currentChat} changeChat={changeChat}/>
          ) : <></> 
        }
      </Box>

      <Grid container spacing={4} alignItems="center">
        <Grid id="chat-window" xs={12}
        item>
          <Messages contacts={contacts.contactList} currentChat={currentChat}/>
          <Divider/>
          <ChatInput handleSendMsg={handleSendMsg} /> 
        </Grid>
        
      </Grid>
      
      
    </>
  );
}

