import { IconButton, Tooltip,Menu } from '@mui/material'
import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import AdminMenu from './GroupSettingsItems/AdminMenu';
import MemberMenu from './GroupSettingsItems/MemberMenu';
import { useTranslation} from "react-i18next";
import { useSelector } from 'react-redux';



function GroupSetting({ currentChat, changeChat}) {

    const currentUser = useSelector((state) => {
        return state.currentUser.user
      });

    const authorized = currentChat.admins.includes(currentUser._id);
    
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { t } = useTranslation();
  
    const handleOpenMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    

    const handleCloseMenu = () => {
        setAnchorElUser(null);
    };


  return (
    <>
    
        <Tooltip title={t("Group's settings" )}
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

                    { authorized? <AdminMenu currentChat={currentChat} changeChat={changeChat}/> : <MemberMenu currentChat={currentChat} changeChat={changeChat}/>}

                    </Menu>
    </>
  )
}

export default GroupSetting