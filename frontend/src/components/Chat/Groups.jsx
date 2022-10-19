import React, { useState} from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Stack } from "@mui/material";

export default function Groups({groups, changeChat }) {
 
  const [currentSelected, setCurrentSelected] = useState(undefined);
 
  const changeCurrentChat = (index, group) => {
    setCurrentSelected(index);
    changeChat(group);
  };
  return (
    <React.Fragment>
      <Stack spacing={.5}
      sx={{
        width:"100%"
      }}>
      {groups.map((group, index)=>{
        return(

          <ListItemButton key={group._id} onClick={()=>changeCurrentChat(index,group)}>
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
