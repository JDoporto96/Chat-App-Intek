
import React from 'react'
import ChangeGroupName from './ChangeName'
import DeleteGroup from './DeleteGroup'
import LeaveGroup from './LeaveGroup'
import ManageMembers from './ManageMembers'
import ManageAdmins from './ManageAdmins'

function AdminMenu({currentChat, changeChat}) {
  return (
    <>
      <ChangeGroupName currentChat={currentChat}/>

      <ManageAdmins currentChat={currentChat}/>

      <ManageMembers currentChat={currentChat}/> 

      <LeaveGroup currentChat={currentChat} changeChat={changeChat}/>

      <DeleteGroup currentChat={currentChat} changeChat={changeChat}/>

    </>
    
    
  )
}

export default AdminMenu