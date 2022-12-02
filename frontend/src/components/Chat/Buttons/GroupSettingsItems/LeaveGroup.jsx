import React, { useState } from 'react'
import { MenuItem, Typography,Modal, Container, Button, Grid } from '@mui/material'
import { useMutation } from '@apollo/client';
import UPDATE_GROUP from '../../../../graphql/mutations/updateGroup';
import {Trans } from "react-i18next";
import GET_USER_CONV from '../../../../graphql/queries/getUserConversations';
import GET_USER_GROUPS from '../../../../graphql/queries/getGroups';
import { useSelector } from 'react-redux';


function LeaveGroup({currentChat}) {
    const[open, setOpen]=useState(false);
    const currentUser = useSelector((state) => {
        return state.currentUser
      });
    
    const [updateGroup, ]=useMutation(UPDATE_GROUP,{query:GET_USER_CONV},{query:GET_USER_GROUPS});



    const handleLeave = async()=>{
        let input;
        if(currentChat.admins.includes(currentUser._id)){
            input={
                conversationId:currentChat._id,
                removedAdmins:[currentUser._id]
            }
            updateGroup({variables:{input}})

            if(currentChat.admins.length <=1){
                const newAdmin = currentChat.members.find(member=>member!==currentUser._id);
                input ={
                    conversationId:currentChat._id,
                    newAdmins: [newAdmin]
                }
                updateGroup({variables:{input}})
            }
        }

        input={
            conversationId:currentChat._id,
            removedMembers:[currentUser._id]
        }   
        updateGroup({variables:{input}})
        setOpen(false)
    }
  return (

    <>
        <MenuItem onClick={()=>setOpen(true)} key={"leaveGroup"}>
            <Typography textAlign="center">
            <Trans i18nkey="Leavegroup">Leave group</Trans>
            </Typography>
        </MenuItem>

        <Modal open={open}>
        <Container sx={{
        width:"25rem",
        height:"10rem",
        backgroundColor: "white",
        position: "aboslute",
        marginTop: "10rem"
        }}
        > 
        <Grid container >
            <Grid item xs={12} sx={{marginTop:"2rem"}}>
                <Trans i18nkey="LeavegroupMsg"> 
                Are you sure you want to leave the group?
                </Trans>
               
            </Grid>
        </Grid>
        
            
                <Button 
                onClick={()=>handleLeave()}
                type="submit"
                variant="contained"
                sx={{ mt: "1rem", mb: 2 }}
                ><Trans i18nkey="Accept">Accept</Trans></Button>
            
                <Button 
                onClick={()=>setOpen(false)}
                variant="contained"
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black", }}
                ><Trans i18nkey="Back">Back</Trans></Button>
       
            


            

           
        </Container>

        </Modal>
    </>
  )
}

export default LeaveGroup