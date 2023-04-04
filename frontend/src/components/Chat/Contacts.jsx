import React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import {  Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSubscription } from "@apollo/client";
import CONV_SUBSCRIPTION from "../../graphql/subscription/newConversation";
import RemoveContact from "./Buttons/RemoveContact";
import { CREATE_CONVERSATION, GET_USER_CONVS } from "../../utils/actions";


export default function Contacts({handleChatChange}) {
  
  const {contacts,conversations,currentUser} = useSelector((state) => {
    return state
  });
  const userConvs = conversations.conversations
  const dispatch = useDispatch();

  useSubscription(CONV_SUBSCRIPTION, {
    onData:({data}) =>{
      if (data.data.newConversation.members.includes(currentUser.user._id)){
        dispatch(GET_USER_CONVS())
      }
    }
  })

  
  

  const changeCurrentChat = async(contact) => {
    const conv = userConvs.find(({members, name})=> members.includes(contact._id)&&members.length===2 && !name)
    if(!conv){
      dispatch(CREATE_CONVERSATION({receiverId:contact._id}))

    }else{
      handleChatChange(conv)
    }
  };


  if(contacts.fetched){return (
      <Stack spacing={.5}
      sx={{
        width:"100%",
        overflow:"auto"
      }}>
      {contacts.contactList.map((contact)=>{
        return(
          <Grid container spacing={0}
          sx={{
            overflow: "hidden"
          }}>
          <Grid item xs ={10}>
          <ListItemButton key={contact._id}
          onClick={()=>changeCurrentChat(contact)}
          
          >
            <Typography
            noWrap={true}
            >
              {contact.username}
            </Typography>
          </ListItemButton>
          </Grid>
          <Grid item xs ={2}>
          <RemoveContact contactId={contact._id}/>
          </Grid>
          
          </Grid>
          
        )
      })}
      </Stack>
  

            
  );}
}
