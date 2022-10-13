import { MenuItem, Typography, Modal, Container, Grid, Button } from '@mui/material'
import React from 'react'
import {useState} from 'react'
import BasicTabs from './BasicTabs';

function ManageAdmins() {

    const[open, setOpen]=useState(false);
  return (
    <>
        <MenuItem onClick={()=>setOpen(true)}>
            <Typography> Admins</Typography>
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
        
        <BasicTabs/>
            
            
            <Button 
                onClick={()=>setOpen(false)}
                variant="contained"
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black", }}
            >
                Back
            </Button>

        </Container>

        </Modal>
    </>
  )
}

export default ManageAdmins