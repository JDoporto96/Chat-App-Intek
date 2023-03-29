import React, { useState } from 'react'
import { MenuItem, Typography,Modal, Container, Button, TextField } from '@mui/material'
import { useTranslation, Trans } from "react-i18next";
import { useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import { UPDATE_GROUP } from '../../../../utils/actions';

function ChangeGroupName({currentChat}) {
    const[open, setOpen]=useState(false);
    const[newName, setNewName]=useState("");
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true
      };

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
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const groupName = newName.replaceAll(" ", "");
        if(handleValidation(groupName)){
            const input={
                conversationId:currentChat._id,
                newName
              }
              dispatch(UPDATE_GROUP({input}))
              setNewName("");
              setOpen(false);
        }
        
    }

    const handleChange=(e)=>{
        setNewName(e.target.value)
      };


  return (

    <>
        <MenuItem onClick={()=>setOpen(true)} key={"changeName"}>
            <Typography textAlign="center">
            <Trans i18nkey="ChangeName">Change name</Trans>
            </Typography>
        </MenuItem>

        <Modal open={open}>
        <Container sx={{
        width:{xs:"90vw", sm:"25rem"},
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
                label={t("New name")}
                defaultValue={currentChat.name}
                name="newgroupname"
                inputProps={{ maxLength: 50 }}
                autoFocus/>
                <Button 
                type="submit"
                variant="contained"
                sx={{ mt: "1rem", mb: 2, maxWidth:{xs:"50%", sm: "12rem"} }}
                ><Trans i18nkey="Accept">Accept</Trans></Button>
                <Button 
                onClick={()=>setOpen(false)}
                variant="contained"
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black",maxWidth:{xs:"40%", sm: "12rem"} }}
                ><Trans i18nkey="Back">Back</Trans></Button>

            </form>
        </Container>

        </Modal>
    </>
  )
}

export default ChangeGroupName