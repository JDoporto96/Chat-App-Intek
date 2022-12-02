import { useQuery } from '@apollo/client'
import { ListItemButton, ListItemText } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import GET_USER_GROUPS from '../graphql/queries/getGroups'

function Groups() {
    const {loading,data} =useQuery(GET_USER_GROUPS)

  if(!loading){
    return (
        <>
        
        <Stack spacing={.5}
          sx={{
            width:"100%",
            overflow:"auto"
          }}>
          {data.getUserGroups.map((group)=>{
            return(
    
              <ListItemButton key={group._id}>
                <ListItemText
                
                >
                  {group.name}
    
                </ListItemText>
              </ListItemButton>
            )
          })}
          </Stack>
        
        </>
      )
    }
  }  
  

export default Groups