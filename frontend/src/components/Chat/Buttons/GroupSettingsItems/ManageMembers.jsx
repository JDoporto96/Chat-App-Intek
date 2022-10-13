import { MenuItem, Typography, Modal, Container, Grid, IconButton } from '@mui/material'
import React from 'react'
import {useState} from 'react'
import MembersTab from './MembersTab';
import CloseIcon from '@mui/icons-material/Close';

function ManageMembers({currentChat}) {

    const[open, setOpen]=useState(false);
  return (
    <>
        <MenuItem onClick={()=>setOpen(true)}>
            <Typography> Members</Typography>
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
                <MembersTab currentChat={currentChat} />
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

export default ManageMembers