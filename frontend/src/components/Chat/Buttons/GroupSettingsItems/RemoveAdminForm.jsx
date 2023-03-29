import React, { useState, useEffect } from 'react'
import { Button, } from '@mui/material'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_GROUP } from '../../../../utils/actions';


function RemoveAdminsForm({currentChat}) {
    const currentUser = useSelector((state) => {
      return state.currentUser.user
    });
  
    const contacts = useSelector((state) => {
      return state.contacts.contactList
    });
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const adminsList = currentChat.admins.map(admin=>{
      const contact = contacts.find(contact=>contact._id===admin)
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
        username:t("Unknown user: ...")+ admin.slice(-5),
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
        if(eliminatedAdmins.length>=1){
          const input={
            conversationId:currentChat._id,
            removedAdmins:eliminatedAdmins
          }
          dispatch(UPDATE_GROUP({input}))
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
            <Trans i18nkey="Removeadmins">Remove admins</Trans>
              
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
                ><Trans i18nkey="Accept">Accept</Trans></Button>
    </form>
    </>
  )
}

export default RemoveAdminsForm