import { Box, Stack } from '@mui/material'
import React from "react";
import { useCurrentUser } from "../UserProvider/user";
import Conversation from './Conversation';


function ConversationsPanel({changeChat, conversations}) {
    
    const currentUser = useCurrentUser().currentUser;
    const changeCurrentChat = (conversation) => {
      
      changeChat(conversation);
    };

  return (
    <Box
                
    sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:"85vh"
    }}
    >
      <Stack spacing={.5}
      sx={{
        width:"100%"
      }}>

        {conversations.map(c=> ( 
          <div onClick={()=>changeCurrentChat(c)}>
            <Conversation conversation={c} currentUser={currentUser} />
          </div>
            ))}
      
      
      </Stack>
      

    </Box>


  )
}

export default ConversationsPanel