import { MenuItem, Typography } from '@mui/material'
import React from 'react'
import ChangeGroupName from './ChangeName'
import DeleteGroup from './DeleteGroup'
import LeaveGroup from './LeaveGroup'
import ManageAdmins from './ManageAdmins'

function AdminMenu({currentChat}) {
  return (
    <>
      <ChangeGroupName currentChat={currentChat}/>

      <ManageAdmins/>

      <LeaveGroup currentChat={currentChat}/>

      <DeleteGroup currentChat={currentChat}/>

    </>
    
    
  )
}

export default AdminMenu