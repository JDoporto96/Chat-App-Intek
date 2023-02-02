import React from 'react'
import LeaveGroup from './LeaveGroup'

function MemberMenu({currentChat, changeChat}) {
  return (
    <>
        <LeaveGroup currentChat={currentChat} changeChat={changeChat}/>
    </>
    
  )
}

export default MemberMenu