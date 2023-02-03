import React, { useEffect } from 'react'
import { useState } from 'react';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import { Button, IconButton, Modal, Tooltip,Badge,Stack, Grid, Divider, Typography } from '@mui/material'
import { Container } from '@mui/system';
import { useQuery, useSubscription} from '@apollo/client';
import GET_REQUEST from '../../../graphql/queries/getRequests';
import { useTranslation, Trans } from "react-i18next";
import NEW_REQUEST_SUBSCRIPTION from '../../../graphql/subscription/newRequest';
import { useDispatch, useSelector } from 'react-redux';
import REQUEST_RESPONSE_SUB from '../../../graphql/subscription/requestResponse';


export default function ContactRequests() { 
    const currentUser = useSelector((state) => {
        return state.currentUser.user
      });
    const[open, setOpen]= useState(false);
    const[requests,setRequests] = useState([]);
    const[badgeNumber, setBadgenumber]=useState(undefined);
    const { t } = useTranslation();
    const {data, loading}=useQuery(GET_REQUEST, {fetchPolicy: 'no-cache'})
    const dispatch = useDispatch();


    useEffect(()=>{
        if(!loading){
            setRequests(data.getRequests)
        }
      },[data])
    
      useEffect(()=>{
        setBadgenumber(requests.length)
      },[requests])

    useSubscription(NEW_REQUEST_SUBSCRIPTION,{
        onData:({data}) =>{
            
            if(data.data.requestSend.to === currentUser.username){

                const newRequest = {
                    username:data.data.requestSend.senderUsername, 
                    _id:data.data.requestSend.from
                }
    
                const updatedRequestList = Object.assign([],requests)
                updatedRequestList.push(newRequest);
                setRequests(updatedRequestList)
            } 
        }
      })

    useSubscription(REQUEST_RESPONSE_SUB,{
        onData:({data}) =>{
            if(currentUser._id === data.data.requestResponded.to || currentUser._id === data.data.requestResponded.from){
                if(data.data.requestResponded.status ==="Accepted"){
                    dispatch({type: 'GET_CONTACTS'})  
                }
            }
        }
      })

    

    const handleAccept = async (e) => {
        e.preventDefault();
        const input ={
            senderId:e.target.parentNode.parentNode.getAttribute("id"),
            accepted:true
        }
        const updateList = requests.filter(req=>req._id!==e.target.parentNode.parentNode.getAttribute("id"))
        setRequests(updateList);

        dispatch({type:'RESPOND_REQUEST', payload: {input}})
         
    }

    const handleReject = async (e) => {
        e.preventDefault();
        const input ={
            senderId:e.target.parentNode.parentNode.getAttribute("id"),
            accepted:false
        }
        dispatch({type:'RESPOND_REQUEST', payload: {input}})
        const updateList = requests.filter(req=>req._id!==e.target.parentNode.parentNode.getAttribute("id"))
        setRequests(updateList);

 
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
