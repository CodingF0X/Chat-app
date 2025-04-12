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
import useMessageCreated from "../../hooks/useMessageCreated";

const Chat = () => {
  const params = useParams<{ _id: string }>();
  const chatId = params._id!;
  const { data } = useGetChat({ id: chatId }); // ! to asserts non-null
  const [message, setMessage] = useState<string>("");
  const [createMessage] = useSendMessage(chatId);
  const { data: messages } = useGetMessages({ chatId });
  const { data: latestMessage } = useMessageCreated({ chatId });
  const divRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  console.log(latestMessage?.Message_Created)
  //this is to scroll to latest message sent
  const scrollToBottom = () => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [location,messages]);

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
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <Typography component="h1" variant="h3">
        {data?.Find_Single_Chat.name}
      </Typography>

      <Box overflow={"auto"} sx={{ maxHeight: "80vh" }}>
        {messages?.Get_All_Messages.map((msg) => (
          <Message
            key={msg._id}
            content={msg.content}
            timeStamp={msg.createdAt}
          />
        ))}

        <div ref={divRef}></div>
      </Box>
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
