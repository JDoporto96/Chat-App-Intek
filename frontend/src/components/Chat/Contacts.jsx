import React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Stack } from "@mui/material";
import { useMutation} from "@apollo/client";
import CREATE_CONV from "../../graphql/mutations/createConversation";
import GET_USER_CONV from "../../graphql/queries/getUserConversations";
import { useSelector } from "react-redux";

export default function Contacts({changeChat,conversations }) {
  
  const {contacts} = useSelector((state) => {
    return state.contacts
  });
 
  const [createChat, ] = useMutation(CREATE_CONV,
    {refetchQueries:[{query:GET_USER_CONV}],});

  const changeCurrentChat = async(contact) => {
    const conv = conversations.find(({members})=> members.includes(contact._id)&&members.length===2)
    if(!conv){
      const {data} = await createChat({variables:{receiverId:contact._id}});
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
      {contacts.map((contact)=>{
        return(

          <ListItemButton key={contact._id}
          onClick={()=>changeCurrentChat(contact)}>
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
