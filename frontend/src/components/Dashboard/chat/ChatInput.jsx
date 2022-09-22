import React, {useState } from "react";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import Picker from "emoji-picker-react";
import { TextField, Grid,FormControl, IconButton } from "@mui/material";
import { Fragment } from "react";

export default function ChatInput() {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      console.log("Send: "+ msg)
      setMsg("");
    }
  };


  return (
    <Fragment>
        
        <Grid xs ={1} item>
            <IconButton
                aria-label="emoji"
                color="primary"
                onClick={handleEmojiPickerhideShow}
            >
                <EmojiEmotionsIcon/>
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
            </IconButton>
        </Grid>
        <Grid xs={10} item>
            <FormControl fullWidth>
                <TextField onChange={(e) => setMsg(e.target.value)}
                value={msg}
                label ="Type your message..."
                variant="outlined"
            />
            </FormControl>
        </Grid>
        <Grid xs ={1} item>
            <IconButton
                onClick= {sendChat}
                aria-label="send"
                color="primary"
            >
                <SendIcon/>
            </IconButton>
        </Grid>
    </Fragment>
  );
}

