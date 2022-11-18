import { useQuery } from '@apollo/client';
import { Box, Stack } from '@mui/material'
import React from "react";
import { useSelector } from 'react-redux';
import GET_USER_CONV from '../../graphql/queries/getUserConversations';
import Conversation from './Conversation';


function ConversationsPanel({changeChat}) {
    
  const {currentUser} = useSelector((state) => {
    return state.currentUser
  });

  
    const {loading,data} = useQuery(GET_USER_CONV);
    const changeCurrentChat = (conversation) => {
      changeChat(conversation);
    };
  if(!loading){
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
  
          {data.getUserConversations.map(c=> ( 
            <div key={c._id} onClick={()=>changeCurrentChat(c)}>
              <Conversation conversation={c} currentUser={currentUser} />
            </div>
              ))}
        
        
        </Stack>
        
  
      </Box>
  
  
    )
  }
  }
  

export default ConversationsPanel