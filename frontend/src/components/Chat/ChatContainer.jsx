import React, { useState, useEffect, useRef} from "react";
import ChatInput from "./ChatInput";
import axios from "axios";
import { sendMessageRoute, getAllMessagesRoute } from "../../utils/APIRoutes";
import { Box } from "@mui/system";
import { Grid, Typography,List, ListItem} from "@mui/material";
import "./Chat.css"
import GroupSetting from "./Buttons/GroupSetting";
import { useCurrentUser } from "../UserProvider/user";


const createTimestamp = (date)=>{
  const time = new Date(date)
  
  return `${time.getHours()}:${time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes()}`
}

export default function ChatContainer({ contacts, currentChat , socket}) {
  const currentUser=useCurrentUser().currentUser;
  const [chatName, setChatName]=useState("");
  const [messages,setMessages]=useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef=useRef()

  useEffect(()=>{
    async function getMessages(){
      try{
        const {data} = await axios.get(getAllMessagesRoute+currentChat._id);
      setMessages(data);
      console.log(data)
      
    }catch(err){
    }
    }
    if(currentChat){
      getMessages()
    }
  },[currentChat])

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
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes()}`;

    await axios.post(sendMessageRoute,{
      sender: currentUser._id,
      conversationId: currentChat._id,
      message:msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message:msg,
      timestamp,
      });
  
    const msgs = [...messages];
    msgs.push({sender:currentUser._id, message: msg, timestamp});
    setMessages(msgs);
  };

  useEffect(()=>{
      socket.current.on("get-msg", msg =>{
        setArrivalMessage({ message: msg.message, timestamp:msg.timestamp, sender:msg.from })
      })
  }, []);

  useEffect(()=>{
    arrivalMessage && currentChat._id === arrivalMessage.sender && 
    setMessages((prev)=>[...prev,arrivalMessage])
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
              {chatName}
            </Typography>
          

            {currentChat.name?(
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

                  {(message.sender === currentUser._id)? (
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
                          {message.timestamp? message.timestamp : createTimestamp(message.createdAt)}
                      </Box>
                      
                      ) : 
                      (
                        
                      <Box
                      sx={{
                        
                        maxWidth: "30rem",
                        
                      }}
                      >
                        {currentChat.name ? 
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
                        {message.timestamp? message.timestamp : createTimestamp(message.createdAt)}
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

