import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChatListItem from "./chat-list-item/ChatListItem";
import { Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { useEffect, useState } from "react";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import useGetChats from "../../hooks/useGetChats";
import usePath from "../../hooks/usePaths";
import useMessageCreated from "../../hooks/useMessageCreated";

const ChatList = () => {
  const [openAddChatModal, setOpenAddChatModal] = useState(false);
  const [selected, setSelected] = useState("");
  const { data } = useGetChats();
  const { path } = usePath();
  const chatsIds = data?.Find_Chats.map((chat) => chat._id) || [];
  useMessageCreated({ chatIds: chatsIds });

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
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.Find_Chats &&
            [...data.Find_Chats]
              .sort((chatA, chatB) => {
                if (!chatA.latestMessage || !chatB.latestMessage) {
                  return -1; // Handle cases where latestMessage is undefined
                }
                return (
                  new Date(parseInt(chatA.latestMessage?.createdAt)).getTime() -
                  new Date(parseInt(chatB.latestMessage?.createdAt)).getTime()
                );
              })
              .map((chat) => (
                <ChatListItem
                  key={chat._id}
                  chat={chat}
                  selected={selected === chat._id}
                />
              )).reverse()}
          <Divider variant="inset" component="li" />
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
