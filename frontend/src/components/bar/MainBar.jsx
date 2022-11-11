import React, { Fragment } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ChatIcon from '@mui/icons-material/Chat';
import { useAuth } from '../Auth/auth';
import { useCurrentUser } from '../UserProvider/user';
import { useContactsList } from '../ContactsProvider/contacts';
import { useNavigate} from "react-router-dom";
import { useApolloClient } from '@apollo/client';

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const auth = useAuth();
  const currentUser = useCurrentUser();
  const contacts = useContactsList();
  const navigate= useNavigate();
  const client = useApolloClient();
  
    const handleLogOut = ()=>{
        localStorage.removeItem('chat-app-user-jwt')
        auth.logout();
        currentUser.userLogout();
        contacts.emptyContactsList();
        navigate("/login");
       

    };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    
    <Fragment>
        <Box >
            <AppBar position="static">
            <Container maxWidth="xl" >
                <Toolbar disableGutters sx={{ display:"flex", flexDirection:"row"}}>
                <ChatIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,flexGrow:0 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    flexGrow:"1",
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    React Chat App
                </Typography>
                

                <ChatIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1,flexGrow:0 }} />

                <Box sx={{
                    flexGrow:"1"
                    }}>
                </Box>
                <Box sx={{ flexGrow: 0, }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu}
                        sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                    onClose={handleCloseUserMenu}
                    >
                        <MenuItem key="logOut" 
                            onClick={()=>{
                            handleLogOut();
                            client.clearStore()
                        }}>
                        <Typography textAlign="center">Log Out</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
            </AppBar>
            </Box>
    </Fragment>
  );
};
export default ResponsiveAppBar;
