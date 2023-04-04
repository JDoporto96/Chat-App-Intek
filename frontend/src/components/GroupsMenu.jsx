
import { Box, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Trans } from 'react-i18next'
import AddGroup from './Chat/Buttons/AddGroup'
import Groups from './Chat/Groups'

function GroupsMenu({handleChatChange}) {
  const theme =useTheme();
  console.log(theme)
  return (
    <Box            
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height:"42.5vh"
      }}
    >
      <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor: "primary.light"
      }}
      >
          
          <Grid container>
          <Grid xs ={10} item
          >
            <Typography variant ="h5">
            <Trans i18nkey="Groups">Groups</Trans>
          </Typography>
          </Grid>

          <Grid xs ={2} item>
          <AddGroup />
          </Grid>
        </Grid>

      </Box>
        
        <Groups changeChat={handleChatChange} />
        
    </Box>
  )
}

export default GroupsMenu