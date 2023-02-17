import { AppBar, Container, IconButton, Menu, Toolbar, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment } from 'react'
import ChatIcon from '@mui/icons-material/Chat'
import Language from '../Language'
import SettingsIcon from '@mui/icons-material/Settings';

export default function Bar(){
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
  return (
    <Fragment>
        <Box mb={4}>
            <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <ChatIcon sx={{ display: 'flex', mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'block' },
                    
                    color: 'inherit',
                    textDecoration: 'none',
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
                        onClose={handleCloseUserMenu}
                        >
                            <Language/>
                        </Menu>
                    </Box>
                </Toolbar>
                
                </Container>
                
               
            </AppBar>
        </Box>
    </Fragment>
  )
}
