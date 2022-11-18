import React from 'react'
import { useState } from 'react';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import { Button, IconButton, Modal, TextField, Tooltip } from '@mui/material'
import { Container } from '@mui/system';
import { useMutation } from '@apollo/client';
import SEND_REQUEST from '../../../graphql/mutations/sendContactRequest';
import { useTranslation, Trans } from "react-i18next";


export default function AddContact() { 
    const[open, setOpen]= useState(false);
    const[contact,setContact] = useState("");
    const[result, setResult] =useState("");
    const[sendRequest, ]=useMutation(SEND_REQUEST);

    const { t } = useTranslation();

    const handleChange=(e)=>{
        setContact(e.target.value)
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await sendRequest({variables:{ receiverUsername: contact}})
            if(data.sendContactRequest.success){
                setContact("")
                setOpen(false)
                setResult("")
            }else{
                setResult(data.sendContactRequest.error)
            }
            
        }catch(err){
            setResult(err.response.data.msg)
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
                label={t("Contact's username")}
                name="addContact"
                autoComplete="off"
                autoFocus/>
                <Button 
                type="submit"
                variant="contained"
                sx={{ mt: "1rem", mb: 2 }}
                >
                   <Trans i18nkey="Sendrequest">Send request</Trans> 
                    </Button>
                <Button 
                onClick={()=>setOpen(false)}
                variant="contained"
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black", }}
                ><Trans i18nkey="Back">Back</Trans> </Button>

                <p>{result}</p>
            </form>
            
            </Container>
            
        </Modal>
        </>

    )
}
