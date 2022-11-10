import React from 'react'
import { MenuItem, Typography,Modal, Container, Button, Grid } from '@mui/material'
import { useState } from 'react'
import { useMutation } from '@apollo/client';
import DELETE_GROUP_CONV from '../../../../graphql/mutations/deleteGroup';
import { useTranslation, Trans } from "react-i18next";

function DeleteGroup({currentChat}) {
    const[open, setOpen]=useState(false);
    const[deleteGroup, ]= useMutation(DELETE_GROUP_CONV);
    const { t } = useTranslation();


    const handleDelete = async()=>{
        deleteGroup({variables:{conversationId:currentChat._id}})
        setOpen(false)
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