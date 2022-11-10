import React, { useState} from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Stack } from "@mui/material";
import { useMutation } from "@apollo/client";
import CREATE_CONV from "../../graphql/mutations/createConversation";

export default function Contacts({currentUser, contacts, changeChat,conversations }) {
 
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [createChat, ] = useMutation(CREATE_CONV);

  const changeCurrentChat = async(index, contact) => {
    setCurrentSelected(index);
    const conv = conversations.find(({members})=> members.includes(contact._id)&&members.length===2)
    if(!conv){
      const input = {
        senderId:currentUser._id,
        receiverId:contact._id
      }

      const {data} = await createChat({variables:{input}});
      changeChat(data.createConversation.conversation)
    }else{
      changeChat(conv)
    }
  };
  return (
    <React.Fragment>
      <Stack spacing={.5}
      sx={{
        width:"100%",
        overflow:"auto"
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
