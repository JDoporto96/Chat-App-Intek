import { useLazyQuery, useQuery, useSubscription } from '@apollo/client';
import { List, ListItem,} from '@mui/material';
import { Box} from '@mui/system';
import React, { useRef, useState,useEffect } from 'react'
import GET_CONV from '../graphql/queries/getConversation';
import MESSAGES_SUBSCRIPTION from '../graphql/subscription/newMessage';
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const createTimestamp = (date)=>{
    const time = new Date(date)
    
    return `${time.getHours()}:${time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes()}`
}

function Messages({contacts, currentChat}) {
  const currentUser = useSelector((state) => {
    return state.currentUser.user
  });
  const { t } = useTranslation();
    const[messages, setMessages]=useState([]);
    const[doRefetch, setDoRefetch]=useState(false);
    const conversationId=currentChat._id
    const scrollRef=useRef()

    const {data, loading,refetch} = useQuery(GET_CONV, { variables: 
      {conversationId}, fetchPolicy: 'no-cache'})

    
    useEffect(()=>{
        setDoRefetch(false)
    },[currentChat._id])

    if(doRefetch){
      refetch({conversationId})
    }
    useEffect(()=>{
       if(loading){
          setMessages([])
        }
        if(!loading){
            setMessages(data.getConversation)
            setDoRefetch(true)
        }
      
        
    },[data,currentChat])

 

  //   useEffect(()=>{
  //   //   setMessages([])
  //   //  refetch({conversationId})
  //   if(doRefetch){
  //     console.log("Refetching")
  //     setDoRefetch(false)
  //   }
    
    
  // },[currentChat])



    useSubscription(MESSAGES_SUBSCRIPTION, {
      variables:{conversationId},
      onData:({data}) =>{
        if(currentChat && currentChat._id === data.data.newMessage.conversationId){
          const updatedMessageList = Object.assign([],messages)
          updatedMessageList.push(data.data.newMessage);
          setMessages(updatedMessageList)
        }
        
      }
    })

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"})
      },[messages])

  return (
<>
<List id="chat-window-messages"
          sx={{
            
            display: "flex",
            flexDirection: "column",
            height:{xs:"65vh", lg:"75vh"},
            
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
                        maxWidth: "65%",
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
                        
                        maxWidth: "65%",
                        
                      }}
                      >
                        {currentChat.isGroup ? 
                        (contacts.find(contact =>contact._id === message.sender)?
                          contacts.find(contact =>contact._id === message.sender).username
                          :
                          t("Unknown user: ...")+ message.sender.slice(-5)
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


