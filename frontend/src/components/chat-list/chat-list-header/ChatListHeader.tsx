import { AddCircle } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import React from "react";

const ChatListHeader = () => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="add">
            <AddCircle/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ChatListHeader;
