import React, {  useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { TextField, IconButton, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";


export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const { t } = useTranslation();
  
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>
      <form onSubmit={(event) => sendChat(event)}>
        <Grid container sx={{pl:2, mt:1}}>
        <Grid xs={11} item>
            <TextField fullWidth onChange={(e) => setMsg(e.target.value)}
              value={msg}
              label ={t("Type your message...")}
              variant="outlined"
            />
        </Grid>

        <Grid xs={1} item>
          <IconButton
            type="submit"
            aria-label="send"
            color="primary"
          >
            <SendIcon/>
          </IconButton>
          </Grid>
        </Grid>
      </form>

    </>
      
    
  );
}
