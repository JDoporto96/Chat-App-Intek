import React from 'react'
import { useState, useEffect } from 'react';
import {Add as AddIcon} from '@mui/icons-material/';
import { Button, IconButton, Modal, TextField, Tooltip } from '@mui/material'
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import { useTranslation, Trans } from "react-i18next";

import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from '@apollo/client';
import CONV_SUBSCRIPTION from '../../../graphql/subscription/newConversation';
import { toast } from 'react-toastify';

export default function AddGroup() {
  const {currentUser,contacts }= useSelector((state) => {
    return state
  });
  const dispatch = useDispatch(); 
  
  useSubscription(CONV_SUBSCRIPTION, {
    onData:({data}) =>{
      if (data.data.newConversation.members.includes(currentUser.user._id)){
        dispatch({type:'GET_USER_CONVS'})
      }
    }
  })


  const[groupname,setGroupname]=useState("");
  const[members,setMembers]=useState([]);
  const [personName, setPersonName] = React.useState([]);

  const { t } = useTranslation();

  const handleChange=(e)=>{
    setGroupname(e.target.value)
  };

  const handleNamesChange=(e)=>{
    setPersonName(
      typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
    );
  };

  const toastOptions={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true
  };
  useEffect(()=>{
    const list = personName.map(name=>{
      const member =contacts.contactList.find(contact=>contact.username===name)
      return member._id
    })
    setMembers(list)
  },[personName])

  const handleValidation=(name)=>{
    if(name.length<1){
        toast.error(
            t("Group's name can't be empty"),
            toastOptions
        );
        return false
    }
    return true
}

  const handleSubmit= async (e)=>{
    e.preventDefault();

    const name = groupname.replaceAll(" ","");
    if(handleValidation(name)){
      const input ={
        name: groupname,
        members
      }
      dispatch({type: 'CREATE_GROUP', payload:{input}})
      setPersonName([])
      setOpen(false)
    }
    
    
  }
  

  const[open, setOpen]= useState(false);

  return (
    <>
      <Tooltip title={t("Create new group")} aria-label='create group' onClick={()=> setOpen(true)}>
          <IconButton>
              <AddIcon />
          </IconButton>
      </Tooltip>

      <Modal open={open}>
            <Container sx={{
            width:{xs:"90vw", sm:"30rem"},
            height:"25rem",
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
                id="groupname"
                label={t("Group's name")}
                name="groupname"
                autoComplete="off"
                inputProps={{ maxLength: 50 }}
                autoFocus/>



<div>
      <FormControl sx={{ m: "normal"}} fullWidth>
        <InputLabel id="demo-multiple-chip-label">
        <Trans i18nkey="Members">Members</Trans> 
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
          {contacts.contactList.map(contact => (
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
                sx={{ mt: "1rem", mb: 2, maxWidth:{xs:"50%" } }}
                >
                  <Trans i18nkey="CreateGroupBtn">Create Group</Trans> 
                </Button>
                <Button 
                onClick={()=>{
                  setOpen(false);
                  setPersonName([]);
                  setMembers([])
                }}
                variant="contained"
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black",maxWidth:{xs:"40%"} }}
                >
                  <Trans i18nkey="Back">Back</Trans> 
                </Button>
            </form>
            
            </Container>
            
        </Modal>
        </>

  )
}
