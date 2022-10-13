import React, { useEffect } from 'react'
import { useState } from 'react';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import { Button, IconButton, Modal, TextField, Tooltip,Badge,Stack, Grid, Divider, Typography } from '@mui/material'
import { Container } from '@mui/system';
import axios from 'axios';
import { profilesAPIRoute } from '../../../utils/APIRoutes';
import { useCurrentUser } from '../../UserProvider/user';


export default function ContactRequests() { 
    const currentUser=useCurrentUser();
    const[open, setOpen]= useState(false);
    const[requests,setRequests] = useState([]);
    const[badgeNumber, setBadgenumber]=useState(undefined);

    useEffect(()=>{
        async function fetchData(){
          const response = await axios.get(`${profilesAPIRoute}/${currentUser.currentUser._id}/requests`);
          setRequests(response.data)
        }
        fetchData()
      },[])

    useEffect(()=>{
        setBadgenumber(requests.length)
      },[requests])

    const handleAccept = async (e) => {
        e.preventDefault();
        axios.post(profilesAPIRoute +`/${currentUser.currentUser._id}/respondcontactrequest`,{
            _id:e.target.parentNode.parentNode.getAttribute("id"),
            accepted:true
        });
    }

    const handleReject = async (e) => {
        e.preventDefault();
        axios.post(profilesAPIRoute +`/${currentUser.currentUser._id}/respondcontactrequest`,{
            _id:e.target.parentNode.parentNode.getAttribute("id"),
            accepted:false
        });
        setOpen(false)  
    }
    
    return (
        <>
        <Badge color= "secondary" badgeContent={badgeNumber} max={99}  >
        <Tooltip title="Contact requests" onClick={()=> setOpen(true)}>
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
                    Close
                </Button>
                {requests.length === 0 ? (
                    <Typography> You don't have any request pending </Typography>
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
                                    Accept
                                </Button>
                            </Grid>
                            <Grid xs={3} item >
                                <Button 
                                    variant="contained"
                                    onClick={handleReject}
                                    sx={{ ml:"1rem",backgroundColor:"red" }}
                                    >
                                    Reject
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
