import React from 'react'
import { useState } from 'react';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import { Button, IconButton, Modal, TextField, Tooltip } from '@mui/material'
import { Container } from '@mui/system';
import { useTranslation, Trans } from "react-i18next";
import { useDispatch, useSelector} from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { SEND_REQUEST } from '../../../utils/actions';



export default function AddContact() { 
    const currentUser = useSelector((state)=>{
        return state.currentUser.user
    });
    const[open, setOpen]= useState(false);
    const[contact,setContact] = useState("");
    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true
    };
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleChange=(e)=>{
        setContact(e.target.value)
      };

    const handleValidation=(username)=>{
        
        if(username === currentUser.username){
            toast.error(
                t("Cannot send request to yourself"),
                toastOptions
            );
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const receiverUsername = contact.trim();
        if(handleValidation(receiverUsername)){
            dispatch(SEND_REQUEST({receiverUsername}))
            setOpen(false)
        }
        
    }


    return (
        <>
        <Tooltip title={t("Add contact")} onClick={()=> setOpen(true)}>
            <IconButton>
                <PersonAddAltTwoToneIcon />
            </IconButton>
        </Tooltip>

        <Modal open={open}>
            <Container sx={{
            width:{xs:"90vw", sm:"30rem"},
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
                label={t("Contact's username")}
                name="addContact"
                autoComplete="off"
                inputProps={{ maxLength: 15 }}
                autoFocus/>
                <Button 
                type="submit"
                variant="contained"
                sx={{ mt: "1rem", mb: 2,maxWidth:{xs:"50%", sm: "12rem"} }}
                
                >
                   <Trans i18nkey="Sendrequest">Send request</Trans> 
                </Button>
                <Button 
                onClick={()=>{setOpen(false)}}
                variant="contained"
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black", maxWidth:{xs:"40%", sm: "12rem"} }}
                ><Trans i18nkey="Back">Back</Trans> </Button>

            </form>
            
            </Container>
            
        </Modal>
        </>

    )
}
