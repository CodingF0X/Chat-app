import { useLocation, useParams } from "react-router-dom";
import useGetChat from "../../hooks/useGetChat";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import useSendMessage from "../../hooks/useSendMessage";
import { useEffect, useRef, useState } from "react";
import Message from "./message/Message";
import useGetMessages from "../../hooks/useGetMessages";
import { PAGE_SIZE } from "../../constants/pagination.constants";
import useCountMessages from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";

const Chat = () => {
  const params = useParams<{ _id: string }>();
  const chatId = params._id!;
  const { data } = useGetChat({ id: chatId }); // ! to asserts non-null

  const [message, setMessage] = useState<string>("");
  const [createMessage] = useSendMessage(chatId);
  const { data: messages, fetchMore } = useGetMessages({
    chatId,
    skip: 0,
    limit: PAGE_SIZE,
  });
  const { countMessages, messagesCount } = useCountMessages(chatId);
  const divRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  //this is to scroll to latest message sent
  const scrollToBottom = () => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (
      messages?.Get_All_Messages &&
      messages.Get_All_Messages.length < PAGE_SIZE
    )
      scrollToBottom();
  }, [location.pathname, messages]);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  const handleSendMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: { content: message, chatId: chatId },
      },
    });

    setMessage("");
    scrollToBottom();
  };
  return (
    <Stack sx={{ height: "80vh", justifyContent: "space-between" }}>
      <Typography component="h1" variant="h3">
        {data?.Find_Single_Chat.name}
      </Typography>
      {""}
      <Box overflow={"auto"} sx={{ maxHeight: "80vh" }}>
        {""}
        <InfiniteScroll
          pageStart={0}
          isReverse={true}
          loadMore={() =>
            fetchMore({
              variables: {
                skip: messages?.Get_All_Messages?.length,
              },
            })
          }
          hasMore={
            messages?.Get_All_Messages && messagesCount
              ? messages?.Get_All_Messages.length < messagesCount
              : false
          }
          useWindow={false}
        >
          {messages?.Get_All_Messages?.slice() // Create a copy to avoid mutating the original array
            .sort((messageA, messageB) => {
              // Convert createdAt strings to Date objects and compare
              return (
                new Date(messageB.createdAt).getTime() -
                new Date(messageA.createdAt).getTime()
              );
            })
            .map((msg) => (
              <Message
                key={msg._id}
                content={msg.content}
                timeStamp={msg.createdAt}
              />
            ))}
          <div ref={divRef}></div>
        </InfiniteScroll>
        {""}
      </Box>
      {""}
      <Paper
        sx={{
          padding: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
        elevation={8}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />

        <Divider sx={{ height: 30, m: 0.5 }} orientation="vertical" />

        <IconButton onClick={handleSendMessage} color="primary">
          <Send />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
