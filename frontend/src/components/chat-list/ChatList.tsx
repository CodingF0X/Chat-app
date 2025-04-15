import Divider from "@mui/material/Divider";
import ChatListItem from "./chat-list-item/ChatListItem";
import { Box, Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import { useEffect, useState } from "react";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import useGetChats from "../../hooks/useGetChats";
import usePath from "../../hooks/usePaths";
import useMessageCreated from "../../hooks/useMessageCreated";
import useCountChats from "../../hooks/useCountChats";
import { PAGE_SIZE } from "../../constants/pagination.constants";
import InfiniteScroll from "react-infinite-scroller";

const ChatList = () => {
  const [openAddChatModal, setOpenAddChatModal] = useState(false);
  const [selected, setSelected] = useState("");
  const { data, fetchMore } = useGetChats({ skip: 0, limit: PAGE_SIZE });
  const { countChats, chatsCount } = useCountChats();
  const { path } = usePath();
  const chatsIds = data?.Find_Chats.map((chat) => chat._id) || [];
  useMessageCreated({ chatIds: chatsIds });

  useEffect(() => {
    const selectedPath = path.split("chats/");
    setSelected(selectedPath[1]);
  }, [path]);

  useEffect(() => {
    countChats();
  }, [countChats]);

  return (
    <>
      <ChatListAdd
        open={openAddChatModal}
        handleClosed={() => setOpenAddChatModal(false)}
      />
      {""}
      <Stack>
        <ChatListHeader handleCreateChat={() => setOpenAddChatModal(true)} />
        <Divider />
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "73vh",
            overflow: "auto",
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={() =>
              fetchMore({
                variables: {
                  skip: data?.Find_Chats.length,
                },
              })
            }
            hasMore={
              data?.Find_Chats && chatsCount
                ? data?.Find_Chats.length <= chatsCount
                : false
            }
            useWindow={false}
          >
            {data?.Find_Chats &&
              [...new Map(data.Find_Chats.map(chat => [chat._id, chat])).values()]
                .sort((chatA, chatB) => {
                  if (!chatA.latestMessage || !chatB.latestMessage) {
                    return -1; // Handle cases where latestMessage is undefined
                  }
                  return (
                    new Date(
                      parseInt(chatA.latestMessage?.createdAt)
                    ).getTime() -
                    new Date(parseInt(chatB.latestMessage?.createdAt)).getTime()
                  );
                })
                .map((chat) => (
                  <ChatListItem
                    key={chat._id}
                    chat={chat}
                    selected={selected === chat._id}
                  />
                ))
                .reverse()}
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
};

export default ChatList;
