import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ContactsMenu from './ContactsMenu';
import GroupsMenu from './GroupsMenu';
import ChatContainer from './Chat/ChatContainer';

import { Container } from '@mui/system';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient, useSubscription } from '@apollo/client';
import ChatIcon from '@mui/icons-material/Chat';
import Welcome from './Chat/Welcome';
import UPDATE_GROUP_SUB from '../graphql/subscription/updateGroup';
import CONV_DELETED_SUB from '../graphql/subscription/convDeleted';
import Language from './Language';
import { GET_REQUESTS, GET_USER_CONVS, LOGOUT } from '../utils/actions';


const drawerWidth = 240;
const barHeight = 65;
interface Props {
  window?: () => Window,
}

export default function ResponsiveDrawer(props: Props) {
  const { t } = useTranslation();  
  const {currentUser} = useSelector((state) => {
        return state
      });
    const {username} = useSelector((state) => {
        return state.currentUser.user
      });
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const {isLogged} = useSelector((state) => {
      return state.auth
    });
    const [currentChat, setCurrentChat] = React.useState(undefined);
    const client = useApolloClient();
    const dispatch = useDispatch();
      
    const handleLogOut = async(e)=>{
          e.preventDefault();
          localStorage.removeItem('chat-app-user-jwt');
          dispatch(LOGOUT())
          client.clearStore();
          
          
      };
  
  React.useEffect(()=>{
  }, [isLogged])
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    React.useEffect(()=>{
      dispatch(GET_REQUESTS())
  
    },[])
    
    useSubscription(UPDATE_GROUP_SUB, {
        onData:({data}) =>{
          if(currentChat !== undefined && data.data.updateGroup._id === currentChat._id  ){
            if(data.data.updateGroup.members.includes(currentUser.user._id)){
              
              setCurrentChat(data.data.updateGroup)
            }else{
              setCurrentChat(undefined)
            }
            
          }
    
          dispatch(GET_USER_CONVS())
      
        }
      })
    
      useSubscription(CONV_DELETED_SUB, {
        onData:({data}) =>{
          if(data.data.conversationDeleted.members.includes(currentUser.user._id)){
            if(currentChat !== undefined && data.data.conversationDeleted._id === currentChat._id ){
              setCurrentChat(undefined)
            }
            dispatch(GET_USER_CONVS())
    
          }
        }
      })
    
      const handleChatChange = (chat) => {
        setCurrentChat(chat);
        
      };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  
  const drawer = (
    <div>
        <Box paddingTop={2}
        paddingLeft={2}
                sx={{textAlign:'justify',height:'.3rem',  width:`${drawerWidth}`}}>
                    <Typography
                        variant="h5"
                        noWrap={true}
                        sx={{ 
                            color: 'inherit',
                        }}
                    >
                       {t('Hi')}, {username}
                    </Typography>
        </Box>

      <Toolbar />
      <Divider />
      <ContactsMenu handleChatChange={ handleChatChange}/>
      <Divider />
      <GroupsMenu handleChatChange={ handleChatChange}/>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
       
        <AppBar position="fixed"
            sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            height: `${barHeight}px`,
            ml: { sm: `${drawerWidth}px` },
            }}>
        <Toolbar >
                    
        <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            ><MenuIcon />
        </IconButton>
                
                    <ChatIcon sx={{ display: 'flex', mr: 1,flexGrow:0 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                        display: { xs: 'none', md: 'flex' },
                        color: 'inherit',
                        }}
                    >
                        React Chat App
                    </Typography>

                    <Box sx={{
                        flexGrow:"1", justifyContent: 'center'
                        }}>
                        <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                        display: { xs: 'none', md: 'flex' },
                        color: 'inherit',
                        }}
                    >
                        
                    </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
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
                                onClick={(e)=>{
                                handleLogOut(e);
                            }}>
                            <Typography textAlign="center">
                            <Trans i18nkey="Logout">Log out</Trans>

                            </Typography>
                            </MenuItem>
                            <Language/>
                        </Menu>
                    </Box>
                    </Toolbar>
                
        </AppBar>
      
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, } }
            aria-label="mailbox folders"
        >

            
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, 
            }}
            >
                
            {drawer}
            </Drawer>
            <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
            >
            {drawer}
            </Drawer>
        </Box>

        <Box
            component="main"
            sx={{
                marginTop:`${barHeight}px`,
                flexGrow: 1,
                width: { sm: `calc(100vw - ${drawerWidth}px)`, xs:'100vw' }
            }}
            
        >
        
        {currentChat === undefined ? 
                  <Welcome />
                  : 
                  <ChatContainer currentChat={currentChat} changeChat={handleChatChange} />
                }
        </Box>
    </Box>
  );
}