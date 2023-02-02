import { ListItemButton, ListItemText } from '@mui/material';
import React, { useEffect, useState  } from 'react';
import { useSelector } from 'react-redux';

function Conversation({conversation, currentUser}) {
  const {contactList} = useSelector((state) => {
    return state.contacts
  });
  const[ conversationName, setConversationName] = useState("");

  useEffect(()=>{
    if(conversation.name){
      setConversationName(conversation.name)
    }else{
      const contactId = conversation.members.find(m => m!== currentUser._id);
      const contactUsername = contactList.find(contact => contact._id === contactId).username;
      setConversationName(contactUsername)
    }
  },[conversation])


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