import React, { Fragment } from 'react'
import {Box, Container, Paper, Typography} from '@mui/material'

function Sidebar() {
  return (
    <Fragment>
        <Container>
            <Paper elevation={5}>
                <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height:"90vh"
                }}
                >
                    <Typography variant ="h6">
                        Sidebar
                    </Typography>
                </Box>
            </Paper>
        </Container>
        
    </Fragment>
  )
}

export default Sidebar