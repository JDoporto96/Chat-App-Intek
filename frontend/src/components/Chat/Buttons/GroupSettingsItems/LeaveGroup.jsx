import React from 'react'
import { MenuItem, Typography,Modal, Container, Button, Grid } from '@mui/material'
import { useState } from 'react'
import {useCurrentUser} from '../../../UserProvider/user'
import axios from 'axios';
import { addAdminsRoute, removeAdminRoute, removeMemberRoute } from '../../../../utils/APIRoutes';


function LeaveGroup({currentChat}) {
    const[open, setOpen]=useState(false);
    const currentUser=useCurrentUser().currentUser;


    const handleLeave = async()=>{
        if(currentChat.admins.includes(currentUser._id)){
            await axios.patch(removeAdminRoute,{
                _id:currentChat._id,
                admin:currentUser._id
            })
            if(currentChat.admins.length <=1){
                const newAdmin = currentChat.members.find(member=>member!==currentUser._id);
                await axios.patch(addAdminsRoute,{
                    _id: currentChat._id,
                    newAdmins: [newAdmin]
                })
            }
        } 
            
        
        await axios.patch(removeMemberRoute,{
            _id:currentChat._id,
            member:currentUser._id
        })

        setOpen(false)
    }
  return (

    <>
        <MenuItem onClick={()=>setOpen(true)} key={"leaveGroup"}>
            <Typography textAlign="center">Leave group</Typography>
        </MenuItem>

        <Modal open={open}>
        <Container sx={{
        width:"25rem",
        height:"10rem",
        backgroundColor: "white",
        position: "aboslute",
        marginTop: "10rem"
        }}
        > 
        <Grid container >
            <Grid item xs={12} sx={{marginTop:"2rem"}}>Are you sure you want to leave the group?</Grid>
        </Grid>
        
            
                <Button 
                onClick={()=>handleLeave()}
                type="submit"
                variant="contained"
                sx={{ mt: "1rem", mb: 2 }}
                >Leave</Button>
            
                <Button 
                onClick={()=>setOpen(false)}
                variant="contained"
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black", }}
                >Back</Button>
       
            


            

           
        </Container>

        </Modal>
    </>
  )
}

export default LeaveGroup