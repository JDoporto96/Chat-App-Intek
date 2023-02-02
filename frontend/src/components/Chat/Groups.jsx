import React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function Groups({changeChat}) {

  const {conversations} = useSelector((state) => {
    return state
  });

  const dispatch = useDispatch();

  dispatch({type:'GET_USER_GROUPS'});

  const changeCurrentChat = (group) => {
    changeChat(group);
  };

  
  return (
      <React.Fragment>
        <Stack spacing={.5}
        sx={{
          width:"100%",
          overflow:"auto"
        }}>
        {conversations.groups.map((group)=>{
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
  