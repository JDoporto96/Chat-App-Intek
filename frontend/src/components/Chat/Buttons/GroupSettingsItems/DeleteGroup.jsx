import React from 'react'
import { MenuItem, Typography,Modal, Container, Button, Grid } from '@mui/material'
import { useState } from 'react'
import axios from 'axios';
import { deleteGroupRoute } from '../../../../utils/APIRoutes';


function DeleteGroup({currentChat}) {
    const[open, setOpen]=useState(false);
    


    const handleDelete = async()=>{
        axios.delete(deleteGroupRoute+`/${currentChat._id}`)
        setOpen(false)
    }
  return (

    <>
        <MenuItem onClick={()=>setOpen(true)} key={"changeName"}>
            <Typography textAlign="center">Delete group</Typography>
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
            <Grid item xs={12} sx={{marginTop:"2rem"}}>Are you sure you want to delete the group?</Grid>
        </Grid>
        
            
                <Button 
                onClick={()=>handleDelete()}
                type="submit"
                variant="contained"
                sx={{ mt: "1rem", mb: 2 }}
                >Accept</Button>
            
                <Button 
                onClick={()=>setOpen(false)}
                variant="contained"
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black", }}
                >Back</Button>
       
            


            

           
        </Container>

        </Modal>
    </>
  )
}

export default DeleteGroup