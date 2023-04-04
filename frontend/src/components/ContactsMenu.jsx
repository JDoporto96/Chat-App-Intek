import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { Trans } from 'react-i18next'
import AddContact from './Chat/Buttons/AddContact'
import ContactRequests from './Chat/Buttons/ContactRequests'
import Contacts from './Chat/Contacts'
import {useSubscription } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import NEW_REQUEST_SUBSCRIPTION from '../graphql/subscription/newRequest'
import REQUEST_RESPONSE_SUB from '../graphql/subscription/requestResponse'
import { GET_CONTACTS, GET_REQUESTS } from '../utils/actions'

function ContactsMenu({handleChatChange}) {

  const currentUser = useSelector((state) => {
    return state.currentUser.user
  });

  const dispatch = useDispatch();
 
  

  useSubscription(NEW_REQUEST_SUBSCRIPTION,{
    onData:({data}) =>{
        
        if(data.data.requestSend.to === currentUser.username){
          dispatch(GET_REQUESTS()) 
            
        } 
    }
  })

  useSubscription(REQUEST_RESPONSE_SUB,{
    onData:({data}) =>{
        if(currentUser._id === data.data.requestResponded.to || currentUser._id === data.data.requestResponded.from){
            if(data.data.requestResponded.status ==="Accepted"){
              dispatch(GET_REQUESTS()) 
                dispatch(GET_CONTACTS())  
            }
        }
    }
  })



  return (
    <Box     
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height:"42.5vh"
                }}
                >
                  <Box
                  p={2}
                  sx={{
                    width: "100%",
                    backgroundColor: "primary.light",
                  }}>
                    <Grid container>
                      
                      <Grid xs ={8} item
                      >
                        <Typography variant ="h5">
                        <Trans i18nkey="Contacts">Contacts</Trans>
                        </Typography>
                      </Grid>
                      <Grid xs ={2} item>
                        <ContactRequests />
                      </Grid>
                      <Grid xs ={2} item>
                        <AddContact/>
                      </Grid>
                    </Grid>
                     
                      
                      
                  </Box>
                    
                    <Contacts handleChatChange={handleChatChange} 
                    />
                    
                </Box>
  )
}

export default ContactsMenu