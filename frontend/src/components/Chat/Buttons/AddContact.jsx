import React from 'react'
import { useState } from 'react';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import { Button, IconButton, Modal, TextField, Tooltip } from '@mui/material'
import { Container } from '@mui/system';
import axios from 'axios';
import { profilesAPIRoute } from '../../../utils/APIRoutes';
import { useCurrentUser } from '../../UserProvider/user';


export default function AddContact() { 
    const currentUser=useCurrentUser();
    const[open, setOpen]= useState(false);
    const[contact,setContact] = useState("");
    const[result, setResult] =useState("");

    

    const handleChange=(e)=>{
        setContact(e.target.value)
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post(profilesAPIRoute +`/${currentUser.currentUser._id}/sendcontactrequest`,{
                username: contact
            });
            setContact("")
            setOpen(false)
            setResult("")
        }catch(err){
            setResult(err.response.data.msg)
        }
        
    }
    


    return (
        <>
        <Tooltip title="Add contact" onClick={()=> setOpen(true)}>
            <IconButton>
                <PersonAddAltTwoToneIcon />
            </IconButton>
        </Tooltip>

        <Modal open={open}>
            <Container sx={{
            width:"30rem",
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
                id="email"
                label="Contact's username"
                name="addContact"
                autoComplete="off"
                autoFocus/>
                <Button 
                type="submit"
                variant="contained"
                sx={{ mt: "1rem", mb: 2 }}
                >Send request</Button>
                <Button 
                onClick={()=>setOpen(false)}
                variant="contained"
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black", }}
                >Back</Button>

                <p>{result}</p>
            </form>
            
            </Container>
            
        </Modal>
        </>

    )
}
