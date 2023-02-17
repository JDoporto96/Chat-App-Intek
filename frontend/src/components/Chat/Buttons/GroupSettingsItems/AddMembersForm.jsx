import React, { useState, useEffect } from 'react'
import { Button, } from '@mui/material'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Trans } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';




function AddMembersForm({currentChat}) {
    const [personName, setPersonName] = React.useState([]);
    const[newMembers,setNewMembers]=useState([]);
    const contactsList = useSelector((state) => {
      return state.contacts.contactList
    });
   
    const contacts = contactsList.filter(contact=> !currentChat.members.includes(contact._id));
    const dispatch = useDispatch();

    

    const handleNamesChange=(e)=>{
        setPersonName(
        typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
        );
    };

    useEffect(()=>{
        const list = personName.map(name=>{
          const member =contacts.find(contact=>contact.username===name)
          return member._id
        })
        setNewMembers(list)
      },[personName])

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(newMembers.length>=1){
          const input={
            conversationId:currentChat._id,
            newMembers
          }
          dispatch({type:'UPDATE_GROUP', payload: {input}})
        }
        
        setPersonName([])
      }

  return (
    <>
    <form
        autoComplete='off'
        onSubmit={handleSubmit}
    >

        <div>
        <FormControl sx={{ m: "normal"}} fullWidth>
            <InputLabel id="demo-multiple-chip-label">
            <Trans i18nkey="Addmembers">Add members</Trans>
            </InputLabel>
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
            {contacts.map(contact => (
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
                ><Trans i18nkey="Accept">Accept</Trans></Button>
    </form>
    </>
  )
}

export default AddMembersForm