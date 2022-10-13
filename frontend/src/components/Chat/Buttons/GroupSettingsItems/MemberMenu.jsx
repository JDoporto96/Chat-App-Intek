import React from 'react'
import LeaveGroup from './LeaveGroup'

function MemberMenu({currentChat}) {
  return (
    <>
        <LeaveGroup currentChat={currentChat}/>
    </>
    
  )
}

export default MemberMenu