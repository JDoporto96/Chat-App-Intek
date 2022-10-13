import React from 'react'
import { MenuItem, Typography,Modal, Container, Button, TextField } from '@mui/material'
import { useState } from 'react'
import axios from 'axios';
import { renameGroupRoute } from '../../../../utils/APIRoutes';


function ChangeGroupName({currentChat}) {
    const[open, setOpen]=useState(false);
    const[newName, setNewName]=useState("");
    
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        axios.patch(renameGroupRoute,{
            _id: currentChat._id,
            newName: newName
        })
        setNewName("");
        setOpen(false);
    }

    const handleChange=(e)=>{
        setNewName(e.target.value)
      };


  return (

    <>
        <MenuItem onClick={()=>setOpen(true)} key={"changeName"}>
            <Typography textAlign="center">Change name</Typography>
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
       <form 
            autoComplete='off' 
            onSubmit={handleSubmit} 
            onChange={(e)=> handleChange(e)}
            >
                <TextField  margin="normal"
                required
                fullWidth
                id="newgroupname"
                label="New name"
                name="newgroupname"
                autoComplete="off"
                autoFocus/>
                <Button 
                type="submit"
                variant="contained"
                sx={{ mt: "1rem", mb: 2 }}
                >Accept</Button>
                <Button 
                onClick={()=>setOpen(false)}
                variant="contained"
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black", }}
                >Back</Button>

            </form>
        </Container>

        </Modal>
    </>
  )
}

export default ChangeGroupName