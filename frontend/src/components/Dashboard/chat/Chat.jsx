import { Box, Paper, Typography, Divider, Grid, List, ListItem, ListItemText, FormControl, TextField } from '@mui/material'
import { Container } from '@mui/system'
import React, { Fragment } from 'react'
import { useState } from 'react'
import ChatInput from './ChatInput';
import './Chat.css';

function Chat() {
    
    const[chatMessages, setChatMessages]=useState([]);
    const[message, setMessage]=useState("");

    
    const listChatMessages = chatMessages.map((chatMessageDto,index)=>{
        <ListItem key={index}>
            <ListItemText primary={`${chatMessageDto.user}: ${chatMessageDto.message}`}/>
        </ListItem>
    });
  
    return (
    <Fragment>
        <Container>
            <Paper elevation={5}>
                <Box p={3} sx={{
                    height:"90vh"
                }}>
                    <Typography variant="h4" gutterBottom>
                        Nice Chatting
                    </Typography>
                    <Divider/>
                    <Grid container spacing={4} alignItems= "center">
                        <Grid id="chat-window" xs={12} item >
                            <List id="chat-window-messages">
                                {listChatMessages}
                            </List>
                            <Divider/>
                        </Grid>
                    <ChatInput/>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    </Fragment>
  )
}

export default Chat