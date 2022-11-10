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
import { useContactsList } from '../../../ContactsProvider/contacts';
import { useMutation } from '@apollo/client';
import UPDATE_GROUP from '../../../../graphql/mutations/updateGroup';
import { useTranslation, Trans } from "react-i18next";



function RemoveMembersForm({currentChat}) {
    const contacts = useContactsList().contacts;
    const [updateGroup, ]=useMutation(UPDATE_GROUP);

    
    const members = currentChat.members.map(member =>{
      const contact = contacts.find(contact => contact._id === member);
      if(contact){
        return contact
      }
      return{
        username:member,
        _id:member
      }
    })
    const [personName, setPersonName] = React.useState([]);
    const[eliminatedMembers,setEliminatedMembers]=useState([]);

    const handleNamesChange=(e)=>{
        setPersonName(
        typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
        );
    };

    useEffect(()=>{
        const list = personName.map(name=>{
          const member = members.find(contact=>contact.username===name)
          return member._id
        })
        setEliminatedMembers(list)
      },[personName])

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const input={
          conversationId:currentChat._id,
          removedMembers:eliminatedMembers
        }
        updateGroup({variables:{input}})
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
            <Trans i18nkey="Removemembers">Remove members</Trans>
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
            {members.map(contact => (
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

export default RemoveMembersForm