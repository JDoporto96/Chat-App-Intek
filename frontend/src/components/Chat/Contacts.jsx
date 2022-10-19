import React, { useState} from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Stack } from "@mui/material";
import axios from "axios";
import { newConversationRoute } from "../../utils/APIRoutes";

export default function Contacts({currentUser, contacts, changeChat,conversations }) {
 
  const [currentSelected, setCurrentSelected] = useState(undefined);
 
  const changeCurrentChat = async(index, contact) => {
    setCurrentSelected(index);
    const conv = conversations.find(({members})=> members.includes(contact._id)&&members.length===2)
    if(!conv){
      const {data} = await axios.post(newConversationRoute,{
        senderId:currentUser._id,
        receiverId:contact._id
      })
      changeChat(data)
    }else{
      changeChat(conv)
    }
  };
  return (
    <React.Fragment>
      <Stack spacing={.5}
      sx={{
        width:"100%"
      }}>
      {contacts.map((contact, index)=>{
        return(

          <ListItemButton key={contact._id}
          onClick={()=>changeCurrentChat(index,contact)}>
            <ListItemText
            
            >
              {contact.username}

            </ListItemText>
          </ListItemButton>
        )
      })}
      </Stack>
    </React.Fragment>
  

            
  );
}
