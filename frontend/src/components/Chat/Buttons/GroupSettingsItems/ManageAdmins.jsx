import { MenuItem, Typography, Modal, Container, Grid, Button, IconButton } from '@mui/material'
import React from 'react'
import {useState} from 'react'
import BasicTabs from './BasicTabs';
import CloseIcon from '@mui/icons-material/Close';

function ManageAdmins({currentChat}) {

    const[open, setOpen]=useState(false);
  return (
    <>
        <MenuItem onClick={()=>setOpen(true)}>
            <Typography> Admins</Typography>
        </MenuItem>

        <Modal open={open}>
        <Container sx={{
        width:"25rem",
        height:"30rem",
        backgroundColor: "white",
        marginTop: "10rem"
        }}
        > 
        <Grid container>
            <Grid item xs={10} sx={{
                    marginTop:"0.5rem"
                }}>
                <BasicTabs currentChat={currentChat} />
            </Grid>
            <Grid item xs={2}>
                <IconButton
                        title="Close"
                        onClick={()=>setOpen(false)}
                        variant="contained"
                        sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black", position:"left" }}
                >
                    <CloseIcon/>
                </IconButton>
                    
            </Grid>
        </Grid>
                

        
            
            
            

        </Container>

        </Modal>
    </>
  )
}

export default ManageAdmins