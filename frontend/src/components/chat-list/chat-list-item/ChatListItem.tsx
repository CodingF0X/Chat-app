import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Routes from "../../Routes";
import { Chat } from "../../../gql/graphql";
import { useGetMe } from "../../../hooks/useGetMe";

interface ChatListItemProps {
  chat: Chat;
  selected: boolean;
}

const ChatListItem = ({ chat, selected }: ChatListItemProps) => {
  const [latestMsg, setLatestMsg] = useState('')
  const { data: ME } = useGetMe()

  useEffect(()=>{
    if(chat.latestMessage){
      if(chat.latestMessage.user._id === ME?.GET_ME._id ){
        setLatestMsg(`You: ${chat.latestMessage.content}`)
      }else{
        setLatestMsg(chat.latestMessage.content)
      }
    }
  },[chat.latestMessage, ME])
  
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemButton
          onClick={() => {
            Routes.navigate(`/chats/${chat._id}`);
          }}
          selected={selected}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={chat.name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  {chat?.latestMessage?.user.email}
                </Typography>

                <Typography>
                {latestMsg}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default ChatListItem;
