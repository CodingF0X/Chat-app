import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChatListItem from "./chat-list-item/ChatListItem";
import { Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { useEffect, useState } from "react";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import useGetChats from "../../hooks/useGetChats";
import usePath from "../../hooks/usePaths";

const ChatList = () => {
  const [openAddChatModal, setOpenAddChatModal] = useState(false);
  const [selected, setSelected] = useState("");
  const { data } = useGetChats();
  const { path } = usePath();

  useEffect(() => {
    const selectedPath = path.split("chats/");
    setSelected(selectedPath[1]);
  }, [path]);

  return (
    <>
      <ChatListAdd
        open={openAddChatModal}
        handleClosed={() => setOpenAddChatModal(false)}
      />

      <Stack>
        <ChatListHeader handleCreateChat={() => setOpenAddChatModal(true)} />
        <Divider />

        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.Find_Chats.map((chat) => (
            <ChatListItem key={chat._id} chat={chat} selected = {selected === chat._id}/>
          )).reverse()}
          <Divider variant="inset" component="li" />
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
