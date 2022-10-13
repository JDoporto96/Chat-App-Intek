import React, { useState, useEffect, useRef} from "react";
import ChatInput from "./ChatInput";
import axios from "axios";
import { sendMessageRoute, getAllMessagesRoute } from "../../utils/APIRoutes";
import { Box } from "@mui/system";
import { Grid, Typography,List, ListItem, Tooltip, IconButton} from "@mui/material";
import "./Chat.css"
import GroupSetting from "./Buttons/GroupSetting";
import { useCurrentUser } from "../UserProvider/user";

export default function ChatContainer({ contacts, currentChat , socket}) {
  const currentUser=useCurrentUser();
  const [messages,setMessages]=useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef=useRef()

  useEffect(()=>{
    async function fetchData(){
      const response = await axios.post(getAllMessagesRoute,{
        from: currentUser.currentUser._id,
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
      from: currentUser.currentUser._id,
      to: currentChat._id,
      message:msg,
      sendToGroup: currentChat.isGroup
    });

    if(!currentChat.isGroup){
      socket.current.emit("send-msg", {
        to: [currentChat._id],
        from: currentUser.currentUser._id,
        message:msg,
        timestamp,
        sendToGroup: currentChat.isGroup
      });

    }else if(currentChat.isGroup){
      socket.current.emit("send-msg", {
        to: currentChat.members,
        from: currentUser.currentUser._id,
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
        display:"flex",
        flexDirection:"row"
      }}
      >
          
            <Typography variant="h5" gutterBottom
            sx={{
              flexGrow:1
            }}
            >
              {currentChat.username? currentChat.username : currentChat.name}
            </Typography>
          

            {currentChat.isGroup?(
                <GroupSetting currentChat={currentChat}/>
              ) : <></> 
            }
            
          
          
       
        
      </Box>

      <Grid container spacing={4} alignItems="center">
        <Grid id="chat-window" xs={12} item>
          <List id="chat-window-messages"
          sx={{
            display: "flex",
            flexDirection: "column",
            
          }}>
            {
              messages.map(message=>{
                return(
                  <ListItem
                  ref={scrollRef}
                  key={message._id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                  >

                  {message.fromSelf ? (
                      <Box
                      sx={{
                        alignSelf:"flex-end",
                        maxWidth: "30rem",
                        textAlign:"right",
                        
                      }}
                      >
                        <Box
                          sx={{
                            textAlign:"right",
                            padding: "1rem",
                            borderRadius: "20px",
                            backgroundColor: "#1877f2",
                            color: "white",
                            overflowWrap:"break-word"
                            
                          }}>
                          {message.message} 
                        </Box>
                          {message.timestamp}
                      </Box>
                      
                      ) : 
                      (
                        
                      <Box
                      sx={{
                        
                        maxWidth: "30rem",
                        
                      }}
                      >
                        {currentChat.isGroup ? 
                        (contacts.find(contact =>contact._id === message.sender)?
                          contacts.find(contact =>contact._id === message.sender).username
                          :
                          message.sender
                        ) +":"
                        : ""}
                        <Box
                          sx={{
                            textAlign:"left",
                            padding: "1rem",
                            borderRadius: "20px",
                            backgroundColor: "rgb(245, 241, 241)",
                            color: "black",
                            overflowWrap:"break-word"
                           
                          }}>
                          {message.message} 
                        </Box>
                          {message.timestamp}
                      </Box>
                        ) }
                  </ListItem>
                )
              })
            }       
          </List>
          <ChatInput handleSendMsg={handleSendMsg} />   
        </Grid>
        
      </Grid>
      
      
    </React.Fragment>
  );
}

