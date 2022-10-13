import { IconButton, Tooltip,Typography,Menu,MenuItem } from '@mui/material'
import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import AdminMenu from './GroupSettingsItems/AdminMenu';
import MemberMenu from './GroupSettingsItems/MemberMenu';
import {useCurrentUser} from '../../UserProvider/user'




function GroupSetting({ currentChat}) {

    const currentUser=useCurrentUser().currentUser;

    const authorized = currentChat.admins.includes(currentUser._id);
    
    const [anchorElUser, setAnchorElUser] = React.useState(null);

  
    const handleOpenMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    

    const handleCloseMenu = () => {
        setAnchorElUser(null);
    };


  return (
    <>
    
        <Tooltip title="Group's settings" 
                    // onClick={()=> setOpen(true)}
        sx={{
        alignSelf:"flex-end"
        }}
        >
            <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                <SettingsIcon/>
            </IconButton>
        </Tooltip>
        <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseMenu}
                    >

                    { authorized? <AdminMenu currentChat={currentChat}/> : <MemberMenu currentChat={currentChat}/>}

                    </Menu>
    </>
  )
}

export default GroupSetting