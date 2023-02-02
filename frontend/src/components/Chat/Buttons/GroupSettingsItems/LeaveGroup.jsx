import React, { useState } from 'react'
import { MenuItem, Typography,Modal, Container, Button, Grid } from '@mui/material'
import {Trans } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
// import { useSubscription } from '@apollo/client';
// import UPDATE_GROUP_SUB from '../../../../graphql/subscription/updateGroup';


function LeaveGroup({currentChat, changeChat}) {
    const[open, setOpen]=useState(false);
    const currentUser = useSelector((state) => {
        return state.currentUser.user
      });
    
    const  dispatch = useDispatch();
    
    // useSubscription(UPDATE_GROUP_SUB, {
    //     onData:({data}) =>{
    //       if (data.data.updateGroup.members.includes(currentUser._id)){
    //         console.log('sub receied')
    //         dispatch({type:'GET_USER_CONVS'})
    //       }
          
    //     }
    //   })
    



    const handleLeave = async()=>{
        let input;
        if(currentChat.admins.includes(currentUser._id)){
            input={
                conversationId:currentChat._id,
                removedAdmins:[currentUser._id]
            }
            dispatch({type:'UPDATE_GROUP', payload: {input}})

            if(currentChat.admins.length <=1){
                const newAdmin = currentChat.members.find(member=>member!==currentUser._id);
                input ={
                    conversationId:currentChat._id,
                    newAdmins: [newAdmin]
                }
                dispatch({type:'UPDATE_GROUP', payload: {input}})
            }
        }

        input={
            conversationId:currentChat._id,
            removedMembers:[currentUser._id]
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