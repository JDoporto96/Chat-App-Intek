import React from 'react'
import { useState, useEffect } from 'react';
import { Button, } from '@mui/material'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useCurrentUser } from '../../../UserProvider/user';
import axios from 'axios';
import { removeAdminsRoute } from '../../../../utils/APIRoutes';



function RemoveAdminsForm({currentChat}) {
    const currentUser = useCurrentUser().currentUser;
    const adminsList = currentChat.admins.map(admin=>{
      const contact = currentUser.contacts.find(contact=>contact._id===admin)
      if(contact){
        return contact
      }
      
      if(admin === currentUser._id){
        return{
          username:"me",
            id:currentUser._id
        }
      }

      return{
        username:admin,
        _id:admin
      }
      
      
    })
    const [personName, setPersonName] = React.useState([]);
    const[eliminatedAdmins,setEliminatedAdmins]=useState([]);

    const handleNamesChange=(e)=>{
        setPersonName(
        typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
        );
    };

    useEffect(()=>{
        const list = personName.map(name=>{
          const member =adminsList.find(contact=>contact.username===name)
          return member._id
        })
        setEliminatedAdmins(list)
      },[personName])

    const handleSubmit= async (e)=>{
        e.preventDefault();
        await axios.patch(removeAdminsRoute,{
          _id:currentChat._id,
          admins:adminsList
        })
        
      }

  return (
    <>
    <form 
        autoComplete='off' 
        onSubmit={handleSubmit} 
    >
    
        <div>
        <FormControl sx={{ m: "normal"}} fullWidth>
            <InputLabel id="demo-multiple-chip-label">Remove admins</InputLabel>
            <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleNamesChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                    <Chip key={value} label={value} />
                ))}
                </Box>
            )}
            >
            {adminsList.map(contact => (
                <MenuItem
                key={contact._id}
                value={contact.username}
                id={contact._id}
                
                >
                {contact.username}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
        <Button 
                type="submit"
                variant="contained"
                sx={{ mt: "1rem", mb: 2 }}
                >Confirm</Button>
    </form>
    </>
  )
}

export default RemoveAdminsForm