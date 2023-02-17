import { MenuItem, Typography, Modal, Container, Grid, IconButton } from '@mui/material'
import React, { useState } from 'react'
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
        width:{xs:"90vw", sm:"30rem"},
        height:"25rem",
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