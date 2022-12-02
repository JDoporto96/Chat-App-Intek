import { useQuery } from '@apollo/client';
import { List, ListItem,} from '@mui/material';
import { Box} from '@mui/system';
import React, { useRef, useState,useEffect } from 'react'
import GET_CONV from '../graphql/queries/getConversation';
import MESSAGES_SUBSCRIPTION from '../graphql/subscription/newMessage';
import { useSelector } from "react-redux";

const createTimestamp = (date)=>{
    const time = new Date(date)
    
    return `${time.getHours()}:${time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes()}`
}

function Messages({contacts, currentChat}) {
  const {currentUser} = useSelector((state) => {
    return state.currentUser
  });

    const[messages, setMessages]=useState([]);
    const conversationId=currentChat._id
    const scrollRef=useRef()

    const {data, loading, subscribeToMore} = useQuery(GET_CONV, { variables: {conversationId} })
    

    useEffect(()=>{
        if(!loading){
            setMessages(data.getConversation)
        }
    },[data,currentChat])

    useEffect(()=>{
        subscribeToMore({
            document:MESSAGES_SUBSCRIPTION, 
            variables: { conversationId },
            updateQuery:(prev,{subscriptionData})=>{
                if(!subscriptionData.data) return prev;
                
                const newMessage= subscriptionData.data.newMessage;
                const updatedMessageList = Object.assign({},prev,{getConversation:[...prev.getConversation, newMessage]})      
                return updatedMessageList   
        }
    })
    },[])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"})
      },[messages])
  
return (
<>
<List id="chat-window-messages"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "65vh",
            overflow: "auto"
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
                          {createTimestamp(message.createdAt)}
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
                        {createTimestamp(message.createdAt)}
                      </Box>
                        ) }
                  </ListItem>
                )
              })
            }       
          </List>
  </>
)
    
}

export default Messages


