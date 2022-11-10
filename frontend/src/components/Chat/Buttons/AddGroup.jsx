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
import { useCurrentUser } from '../../UserProvider/user';
import { useMutation } from '@apollo/client';
import CREATE_GROUP_CONV from '../../../graphql/mutations/createGroup';
import { useTranslation, Trans } from "react-i18next";


export default function AddGroup({contacts}) {
  const currentUser=useCurrentUser();
  const[groupname,setGroupname]=useState("");
  const[members,setMembers]=useState([]);
  const [personName, setPersonName] = React.useState([]);
  const [createGroup, ] = useMutation(CREATE_GROUP_CONV)
  const { t } = useTranslation();

  const handleChange=(e)=>{
    setGroupname(e.target.value)
  };

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
    list.push(currentUser.currentUser._id);
    setMembers(list)
  },[personName])

  

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const input ={
      name:groupname,
      members,
      creator: currentUser.currentUser._id
    }
    await createGroup({variables:{input}})
    setOpen(false)
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
            width:"30rem",
            height:"30rem",
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
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black", }}
                >
                  <Trans i18nkey="Back">Back</Trans> 
                </Button>
            </form>
            
            </Container>
            
        </Modal>
        </>

  )
}
