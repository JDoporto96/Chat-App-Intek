import React, { useState } from 'react'
import { MenuItem, Typography,Modal, Container, Button, Grid } from '@mui/material'
import {Trans } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';


function LeaveGroup({currentChat, changeChat}) {
    const[open, setOpen]=useState(false);
    const currentUser = useSelector((state) => {
        return state.currentUser.user
      });
    
    const  dispatch = useDispatch();
    
    



    const handleLeave = async()=>{
        let input;
        if(currentChat.admins.includes(currentUser._id) && currentChat.admins.length <=1 ){
            const newAdmin = currentChat.members.find(member=>member!==currentUser._id); 
            input={
                conversationId:currentChat._id,
                removedAdmins:[currentUser._id],
                removedMembers:[currentUser._id],
                newAdmins: [newAdmin]
            }
        }else if(currentChat.admins.includes(currentUser._id)){
            input={
                conversationId:currentChat._id,
                removedAdmins:[currentUser._id],
                removedMembers:[currentUser._id],
            }
        }else{
            input={
                conversationId:currentChat._id,
                removedMembers:[currentUser._id],
                
            }   
        }

        dispatch({type:'UPDATE_GROUP', payload: {input}})
        setOpen(false)
        changeChat(undefined);
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
        width:{xs:"90vw", sm:"30rem"},
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
                sx={{ mt: "1rem", mb: 2,  maxWidth:{xs:"50%"}}}
                ><Trans i18nkey="Accept">Accept</Trans></Button>
            
                <Button 
                onClick={()=>setOpen(false)}
                variant="contained"
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black", maxWidth:{xs:"40%"} }}
                ><Trans i18nkey="Back">Back</Trans></Button>
       
            


            

           
        </Container>

        </Modal>
    </>
  )
}

export default LeaveGroup