import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton>
        <ListItemIcon>
            <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
            </Badge>      
        </ListItemIcon>
      <ListItemText primary="Notifications" />
    </ListItemButton>


    <ListItemButton>
      <ListItemIcon>
        <ForumTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Conversations" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PersonTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Contacts and Groups" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PersonAddAltTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="Add Contact" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <GroupsTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="New Group" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon/>
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
  </React.Fragment>
);

