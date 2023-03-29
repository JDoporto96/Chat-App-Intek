import React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import { Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_GROUPS } from "../../utils/actions";

export default function Groups({changeChat}) {

  const {conversations} = useSelector((state) => {
    return state
  });

  const dispatch = useDispatch();

  dispatch(GET_USER_GROUPS());

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
  
            <ListItemButton key={group._id} onClick={()=>changeCurrentChat(group)}
            
            >
              <Typography
              noWrap={true}
              >
                {group.name}
              </Typography>
              
            </ListItemButton>
          )
        })}
        </Stack>
      </React.Fragment>        
    );
  
}
  