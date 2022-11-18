import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Conversation({conversation, currentUser}) {
  const {contacts} = useSelector((state) => {
    return state.contacts
  });
  const[ conversationName, setConversationName] = useState("");

  useEffect(()=>{
    if(conversation.name){
      setConversationName(conversation.name)
    }else{
      const contactId = conversation.members.find(m => m!== currentUser._id);
      const contactUsername = contacts.find(contact => contact._id === contactId).username;
      setConversationName(contactUsername)
    }
  },[])


  return (
    <ListItemButton 
      key={conversationName}
    >
      <ListItemText>
        {conversationName}
      </ListItemText>
    </ListItemButton>
  )
}

export default Conversation