
import { Box, Stack } from '@mui/material'
import React from "react";
import {useSelector } from 'react-redux';

import Conversation from './Conversation';


function ConversationsPanel({changeChat}) {
    
  const {currentUser, conversations} = useSelector((state) => {
    return state
  });


    const changeCurrentChat = (conversation) => {
      changeChat(conversation);
    };
  
  return (
      <Box
                  
      sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height:"85vh",
      overflow:"auto"
      }}
      >
        <Stack spacing={.5}
        sx={{
          width:"100%"
        }}>
  
          {conversations.conversations.map(c=> ( 
            <div key={c._id} 
            onClick={()=>changeCurrentChat(c)}
            >
              <Conversation conversation={c} currentUser={currentUser.user} />
            </div>
              ))}
        
        
        </Stack>
        
  
      </Box>
  
  
    )
  }
  
  

export default ConversationsPanel