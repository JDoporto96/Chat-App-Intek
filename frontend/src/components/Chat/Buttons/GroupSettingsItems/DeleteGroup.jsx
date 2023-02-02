import React, { useState } from 'react'
import { MenuItem, Typography,Modal, Container, Button, Grid } from '@mui/material'
import { Trans } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
// import { useSubscription } from '@apollo/client';
// import UPDATE_GROUP_SUB from '../../../../graphql/subscription/updateGroup';


function DeleteGroup({currentChat, changeChat}) {
    const[open, setOpen]=useState(false);
    const dispatch = useDispatch();
    // const currentUser = useSelector((state) => {
    //     return state.currentUser.user
    //   });

    const handleDelete = async()=>{
        dispatch({type:'DELETE_GROUP', payload: {conversationId:currentChat._id}})
        setOpen(false)
        changeChat(undefined);
    }

    // useSubscription(UPDATE_GROUP_SUB, {
    //     onData:({data}) =>{
    //       if (data.data.updateGroup.members.includes(currentUser._id)){
    //         dispatch({type:'GET_USER_CONVS'})
    //       }
          
    //     }
    //   })
    
  return (

    <>
        <MenuItem onClick={()=>setOpen(true)} key={"changeName"}>
            <Typography textAlign="center">
            <Trans i18nkey="Deletegroup">Delete group</Trans>
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
            <Trans i18nkey="DeletegroupMsg">Are you sure you want to delete the group?</Trans>
                
            </Grid>
        </Grid>
        
            
                <Button 
                onClick={()=>handleDelete()}
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

export default DeleteGroup