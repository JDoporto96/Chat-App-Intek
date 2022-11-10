import React, { useEffect } from 'react'
import { useState } from 'react';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import { Button, IconButton, Modal, TextField, Tooltip,Badge,Stack, Grid, Divider, Typography } from '@mui/material'
import { Container } from '@mui/system';
import { useCurrentUser } from '../../UserProvider/user';
import { useLazyQuery, useMutation } from '@apollo/client';
import RESPOND_REQUEST from '../../../graphql/mutations/respondContactRequest';
import GET_REQUEST from '../../../graphql/queries/getRequests';
import { useTranslation, Trans } from "react-i18next";

export default function ContactRequests() { 
    const currentUser=useCurrentUser();
    const[open, setOpen]= useState(false);
    const[requests,setRequests] = useState([]);
    const[badgeNumber, setBadgenumber]=useState(undefined);
    const[ respondRequest, ]=useMutation(RESPOND_REQUEST);
    const[getRequests, ]=useLazyQuery(GET_REQUEST)
    const { t } = useTranslation();
    
    useEffect(()=>{
        async function fetchRequests(){
            const {data}= await getRequests({variables:{id:currentUser.currentUser._id}})
            setRequests(data.getRequests)
        }
        fetchRequests()
      },[])

    useEffect(()=>{
        setBadgenumber(requests.length)
      },[requests])

    const handleAccept = async (e) => {
        e.preventDefault();
        const input ={
            receiverId: currentUser.currentUser._id,
            senderId:e.target.parentNode.parentNode.getAttribute("id"),
            accepted:true
        }
        console.log(input)
        respondRequest({variables:{input}})
        setOpen(false)  
        
    }

    const handleReject = async (e) => {
        e.preventDefault();
        const input ={
            receiverId: currentUser.currentUser._id,
            senderId:e.target.parentNode.parentNode.getAttribute("id"),
            accepted:false
        }
        respondRequest({variables:{input}})
        setOpen(false)  
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
            width:"30rem",
            height:"10rem",
            backgroundColor: "white",
            position: "aboslute",
            marginTop: "10rem"
            }}
            > 
                <Button 
                    variant="contained"
                    sx={{ mt: "1rem", mb: 2, left:"80%", backgroundColor:"whitesmoke", color:"black"}}
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
                            <Grid xs={6}item sx={{fontSize:"large"}}> {request.username}</Grid>
                            <Grid xs={3} item>
                                <Button 
                                    variant="contained"
                                    onClick={handleAccept}
                                    >
                                    <Trans i18nkey="Accept">Accept</Trans> 
                                </Button>
                            </Grid>
                            <Grid xs={3} item >
                                <Button 
                                    variant="contained"
                                    onClick={handleReject}
                                    sx={{ ml:"1rem",backgroundColor:"red" }}
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
