import React, { useState} from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Stack } from "@mui/material";

export default function Contacts({contacts, changeChat }) {
 
  const [currentSelected, setCurrentSelected] = useState(undefined);
 
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <React.Fragment>
      <Stack spacing={.5}
      sx={{
        width:"100%"
      }}>
      {contacts.map((contact, index)=>{
        return(

          <ListItemButton key={contact._id}>
            <ListItemText
            onClick={()=>changeCurrentChat(index,contact)}
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
