import { useParams } from "react-router-dom";
import useGetChat from "../../hooks/useGetChat";
import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";

const Chat = () => {
  const params = useParams<{ _id: string }>();
  const { data } = useGetChat({ id: params._id! }); // ! to asserts non-null
  const [message, setMessage] = useState<string>("");
  const [createMessage] = useSendMessage();

  const handleSendMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: { content: message, chatId: params._id! },
      },
    });

    setMessage("");
  };
  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <Typography component="h1" variant="h3">
        {data?.Find_Single_Chat.name}
      </Typography>
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
