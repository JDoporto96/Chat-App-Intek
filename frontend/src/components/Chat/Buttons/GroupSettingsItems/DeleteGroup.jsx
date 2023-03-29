import React, { useState } from 'react'
import { MenuItem, Typography,Modal, Container, Button, Grid } from '@mui/material'
import { Trans } from "react-i18next";
import { useDispatch, } from 'react-redux';
import { DELETE_GROUP } from '../../../../utils/actions';



function DeleteGroup({currentChat, changeChat}) {
    const[open, setOpen]=useState(false);
    const dispatch = useDispatch();
   

    const handleDelete = async()=>{
        dispatch(DELETE_GROUP({conversationId:currentChat._id}))
        setOpen(false)
        changeChat(undefined);
    }

    
  return (

    <>
        <MenuItem onClick={()=>setOpen(true)} key={"changeName"}>
            <Typography textAlign="center">
            <Trans i18nkey="Deletegroup">Delete group</Trans>
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
            <Trans i18nkey="DeletegroupMsg">Are you sure you want to delete the group?</Trans>
                
            </Grid>
        </Grid>
        
            
                <Button 
                onClick={()=>handleDelete()}
                type="submit"
                variant="contained"
                sx={{ mt: "1rem", mb: 2,  maxWidth:{xs:"50%"} }}
                ><Trans i18nkey="Accept">Accept</Trans></Button>
            
                <Button 
                onClick={()=>setOpen(false)}
                variant="contained"
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black",  maxWidth:{xs:"40%"}}}
                ><Trans i18nkey="Back">Back</Trans></Button>
       
            


            

           
        </Container>

        </Modal>
    </>
  )
}

export default DeleteGroup