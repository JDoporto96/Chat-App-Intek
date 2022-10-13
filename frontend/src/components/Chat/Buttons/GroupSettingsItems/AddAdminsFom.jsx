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
import { addAdminsRoute } from '../../../../utils/APIRoutes';



function AddAdminsFom({currentChat}) {
    const currentUser = useCurrentUser().currentUser;
    
    const membersList = currentChat.members.map(member=>{
            const contact = currentUser.contacts.find(contact=>contact._id===member)
            if(contact){
              return contact
            }
            return {
                username:member,
                _id:member}
          })
    const [personName, setPersonName] = React.useState([]);
    const[newAdmins,setNewAdmins]=useState([]);

    const handleNamesChange=(e)=>{
        setPersonName(
        typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
        );
    };

    useEffect(()=>{
        const list = personName.map(name=>{
          const member =membersList.find(contact=>contact.username===name)
          return member._id
        })
        setNewAdmins(list)
      },[personName])

    const handleSubmit= async (e)=>{
        e.preventDefault();
        await axios.patch(addAdminsRoute,{
          _id:currentChat._id,
          newAdmins:newAdmins
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
            <InputLabel id="demo-multiple-chip-label">Add admins</InputLabel>
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
            {membersList.map(contact => (
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

export default AddAdminsFom