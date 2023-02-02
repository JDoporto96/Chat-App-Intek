import React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSubscription } from "@apollo/client";
import CONV_SUBSCRIPTION from "../../graphql/subscription/newConversation";

export default function Contacts({changeChat }) {
  
  const {contacts,conversations,currentUser} = useSelector((state) => {
    return state
  });
  const userConvs = conversations.conversations
  const dispatch = useDispatch();

  useSubscription(CONV_SUBSCRIPTION, {
    onData:({data}) =>{
      if (data.data.newConversation.members.includes(currentUser.user._id)){
        dispatch({type:'GET_USER_CONVS'})
      }
    }
  })
  

  const changeCurrentChat = async(contact) => {
    const conv = userConvs.find(({members})=> members.includes(contact._id)&&members.length===2)
    if(!conv){
      dispatch({type: 'CREATE_CONVERSATION', payload:{receiverId:contact._id}})

    }else{
      changeChat(conv)
    }
  };


  if(contacts.fetched){return (
    <React.Fragment>
      <Stack spacing={.5}
      sx={{
        width:"100%",
        overflow:"auto"
      }}>
      {contacts.contactList.map((contact)=>{
        return(

          <ListItemButton key={contact._id}
          onClick={()=>changeCurrentChat(contact)}
          >
            <ListItemText
            
            >
              {contact.username}

            </ListItemText>
          </ListItemButton>
        )
      })}
      </Stack>
    </React.Fragment>
  

            
  );}
}
