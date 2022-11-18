import React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Stack } from "@mui/material";
import { useQuery } from "@apollo/client";
import GET_USER_GROUPS from "../../graphql/queries/getGroups";

export default function Groups({changeChat}) {

  const {loading,data} = useQuery(GET_USER_GROUPS);
  const changeCurrentChat = (group) => {
    changeChat(group);
  };

  if(!loading){
    return (
      <React.Fragment>
        <Stack spacing={.5}
        sx={{
          width:"100%",
          overflow:"auto"
        }}>
        {data.getUserGroups.map((group)=>{
          return(
  
            <ListItemButton key={group._id} onClick={()=>changeCurrentChat(group)}>
              <ListItemText
              
              >
                {group.name}
  
              </ListItemText>
            </ListItemButton>
          )
        })}
        </Stack>
      </React.Fragment>        
    );
  }
  
}
  