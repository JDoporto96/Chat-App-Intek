import React, { useState } from 'react'
import { MenuItem, Typography,Modal, Container, Button, TextField } from '@mui/material'
import { useTranslation, Trans } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from '@apollo/client';
import UPDATE_GROUP_SUB from '../../../../graphql/subscription/updateGroup';

function ChangeGroupName({currentChat}) {
    const[open, setOpen]=useState(false);
    const[newName, setNewName]=useState("");
    const dispatch = useDispatch();
    const { t } = useTranslation();
    // const currentUser = useSelector((state) => {
    //     return state.currentUser.user
    //   });

    // useSubscription(UPDATE_GROUP_SUB, {
    //     onData:({data}) =>{
    //       if (data.data.updateGroup.members.includes(currentUser._id)){
    //         console.log('changing name')
    //         dispatch({type:'GET_USER_CONVS'})
    //       }
          
    //     }
    //   })
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const input={
            conversationId:currentChat._id,
            newName: newName
          }
          dispatch({type:'UPDATE_GROUP', payload: {input}})
          setNewName("");
          setOpen(false);
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
        width:"25rem",
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
                name="newgroupname"
                autoFocus/>
                <Button 
                type="submit"
                variant="contained"
                sx={{ mt: "1rem", mb: 2 }}
                ><Trans i18nkey="Accept">Accept</Trans></Button>
                <Button 
                onClick={()=>setOpen(false)}
                variant="contained"
                sx={{ mt: "1rem", mb: 2, ml:"1rem", backgroundColor:"white", color:"black", }}
                ><Trans i18nkey="Back">Back</Trans></Button>

            </form>
        </Container>

        </Modal>
    </>
  )
}

export default ChangeGroupName