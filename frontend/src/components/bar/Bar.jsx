import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment } from 'react'
import ChatIcon from '@mui/icons-material/Chat'

export default function Bar(){
  return (
    <Fragment>
        <Box mb={4}>
            <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <ChatIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    React Chat App
                </Typography>
                </Toolbar>
                </Container>
            </AppBar>
        </Box>
    </Fragment>
  )
}
