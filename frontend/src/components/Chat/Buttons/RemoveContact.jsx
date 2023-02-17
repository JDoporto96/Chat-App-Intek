import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription } from '@apollo/client';
import FRIEND_DELETED from '../../../graphql/subscription/friendDeleted';

function RemoveContact({contactId}) {
    const dispatch = useDispatch();
    const {currentUser,conversations}= useSelector((state) => {
        return state
      });

    useSubscription(FRIEND_DELETED, {
        onData:({data}) =>{
            const members = data.data.friendDeleted.exfriends
            if (members.includes(currentUser.user._id)){
                
                const conversation= conversations.conversations.find(conv =>(conv.members.includes(members[0]) 
                && conv.members.includes(members[1])
                && conv.members.length === 2
                && !conv.name))

                dispatch({type:'GET_CONTACTS'})
                if(conversation){
                    
                    dispatch({type:'DELETE_CONV',payload: {conversationId:conversation._id}})
                }
          }
        }
      })


    const handleRemoveFriend=()=>{
        if(window.confirm(t("Do you want to remove this user from your contacts?"))){
            dispatch({type: 'REMOVE_CONTACT', payload:{contactId}})
        }
    }


  return (
    <>
        <Tooltip title={t("Remove friend")} onClick={()=> handleRemoveFriend()}>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    </>
  )
}

export default RemoveContact