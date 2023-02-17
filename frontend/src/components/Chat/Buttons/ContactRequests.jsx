import React, { useEffect } from 'react'
import { useState } from 'react';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import { Button, IconButton, Modal, Tooltip,Badge,Stack, Grid, Divider, Typography } from '@mui/material'
import { Container } from '@mui/system';
import { useTranslation, Trans } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';



export default function ContactRequests() { 
    const[open, setOpen]= useState(false);
    const[badgeNumber, setBadgenumber]=useState(undefined);
    const { t } = useTranslation();
    
    const dispatch = useDispatch();
    const {requests} = useSelector((state) => {
        return state.requests
      });

    
    
      useEffect(()=>{
        setBadgenumber(requests.length)
      },[requests])

    

    const handleAccept = async (e) => {
        e.preventDefault();
        const input ={
            senderId:e.target.parentNode.parentNode.getAttribute("id"),
            accepted:true
        }
        
        dispatch({type:'RESPOND_REQUEST', payload: {input}})
        dispatch({type: 'GET_REQUESTS'})
         
    }

    const handleReject = async (e) => {
        e.preventDefault();
        const input ={
            senderId:e.target.parentNode.parentNode.getAttribute("id"),
            accepted:false
        }
        dispatch({type:'RESPOND_REQUEST', payload: {input}})
        dispatch({type: 'GET_REQUESTS'})
 
    }

    
    return (
        <>
        <Badge color= "secondary" badgeContent={badgeNumber} max={99}  >
        <Tooltip title={t("Contact requests")} onClick={()=> setOpen(true)}>
            <IconButton>
                <PersonTwoToneIcon />
            </IconButton>
        </Tooltip>
        </Badge>

        <Modal open={open}>
            <Container sx={{
            width:{xs:"80vw", sm:"30rem"},
            height:"10rem",
            backgroundColor: "white",
            position: "aboslute",
            marginTop: "10rem"
            }}
            > 
                <Button 
                    variant="contained"
                    sx={{ mt: "1rem", mb: 2, left:{xs:'65%', sm:"80%" }, backgroundColor:"whitesmoke", color:"black"}}
                    onClick={()=>setOpen(false)}
                >
                    <Trans i18nkey="Close">Close</Trans> 
                </Button>
                {requests.length === 0 ? (
                    <Typography> 
                        <Trans i18nkey="NoRequests">You don't have any pending request</Trans> 
                    </Typography>
                ):
                (    <Stack spacing={.5}
                    sx={{
                        width:"100%"
                    }}>
                    {requests.map((request, index)=>{
                        return(
                            <>
                        <Grid container key={request._id} id={request._id}>
                            <Grid xs={3} sm={6}item sx={{fontSize:"large", }}> 
                            <Typography  noWrap={true}>
                            {request.username}
                            </Typography>
                           
                            </Grid>
                            <Grid xs={4} sm={3} item>
                                <Button 
                                    variant="contained"
                                    onClick={handleAccept}
                                    
                                    >
                                    <Trans i18nkey="Accept">Accept</Trans> 
                                </Button>
                            </Grid>
                            <Grid xs={5} sm={3} item >
                                <Button 
                                    
                                    variant="contained"
                                    onClick={handleReject}
                                    sx={{ ml:"1rem",backgroundColor:"red"}}
                                    >
                                    <Trans i18nkey="Reject">Reject</Trans> 
                                </Button>
                            </Grid>
                        </Grid>
                        <Divider/>
                        </>
                        )
                    })}
                    </Stack>)}

            
            </Container>
            
        </Modal>
        </>

    )
}
