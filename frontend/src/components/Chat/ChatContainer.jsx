import React, { useState, useEffect, useRef} from "react";
import ChatInput from "./ChatInput";
import axios from "axios";
import { sendMessageRoute, getAllMessagesRoute } from "../../utils/APIRoutes";
import { Box } from "@mui/system";
import { Grid, Typography,List, ListItem, ListItemText } from "@mui/material";
import "./Chat.css"

export default function ChatContainer({ contacts, currentChat , currentUser, socket}) {
  const [messages,setMessages]=useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef=useRef()

  useEffect(()=>{
    async function fetchData(){
      const response = await axios.post(getAllMessagesRoute,{
        from: currentUser._id,
        to: currentChat._id,
        sendToGroup: currentChat.isGroup
      });
      setMessages(response.data)
    }
    if(currentChat){
      fetchData()
    }
  },[currentChat])


  const handleSendMsg = async (msg)=>{
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes()}`;

    await axios.post(sendMessageRoute,{
      from: currentUser._id,
      to: currentChat._id,
      message:msg,
      sendToGroup: currentChat.isGroup
    });

    if(!currentChat.isGroup){
      socket.current.emit("send-msg", {
        to: [currentChat._id],
        from: currentUser._id,
        message:msg,
        timestamp,
        sendToGroup: currentChat.isGroup
      });
    }else{
      socket.current.emit("send-msg", {
        to: currentChat.members,
        from: currentUser._id,
        message:msg,
        timestamp,
        sendToGroup: currentChat.isGroup
      });
    }
    

    const msgs = [...messages];
    msgs.push({fromSelf:true, message: msg, timestamp});
    setMessages(msgs);
  };

  useEffect(()=>{
    if(socket.current){
      const now = new Date();
      const timestamp = `${now.getHours()}:${now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes()}`;
      socket.current.on("msg-recieve", (msg)=>{
        setArrivalMessage({fromSelf:false, message: msg.message, timestamp, sender:msg.from })
      })
    }
  }, []);

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages])



  return (
    <React.Fragment>
      <Box
      p={2}
      sx={{
        width:"100%",
        backgroundColor: 'primary.light',
      }}
      >
        <Typography variant="h5" gutterBottom>
          {currentChat.name}
        </Typography>
      </Box>

      <Grid container spacing={4} alignItems="center">
        <Grid id="chat-window" xs={12} item>
          <List id="chat-window-messages">
            {
              messages.map(message=>{
                return(
                  <ListItem
                  ref={scrollRef}
                  key={message._id}
                  >

                  {message.fromSelf ? (
                      <ListItemText
                      sx={{
                        textAlign:"right",
                        backgroundColor:"orange",
                        padding: "1rem"
                      }}>
                      {message.message}
                      {message.timestamp}
                      </ListItemText>) : 
                      (
                        <ListItemText
                        sx={{
                          textAlign:"left",
                          backgroundColor:"primary.light",
                          padding: "1rem",
                        }}> 
                        
                        {contacts.find(contact =>contact._id === message.sender)?
                        contacts.find(contact =>contact._id === message.sender).name 
                        :
                        message.sender
                        }
                        : 
                        {message.message}
                        </ListItemText>) }
                      

                  </ListItem>
                )
              })
            }       
          </List>
        </Grid>
        <Grid  xs={12} item>
            
          <ChatInput handleSendMsg={handleSendMsg} />   
        </Grid>
      </Grid>
      
      
    </React.Fragment>
  );
}