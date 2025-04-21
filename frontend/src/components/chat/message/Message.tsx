import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { Message as msgGQL } from "../../../gql/graphql";

interface MessageProps {
  content: msgGQL["content"];
  timeStamp: msgGQL["createdAt"];
  user: msgGQL["user"];
  currentUserId: string | undefined;
}

const Message = ({ content, timeStamp, user, currentUserId }: MessageProps) => {
  const parsedTime = parseInt(timeStamp, 10);
  const isOwn = user._id === currentUserId;

  return (
    <Box
      display="flex"
      mb={1}
      // push to right if own, left if not
      justifyContent={isOwn ? "flex-end" : "flex-start"}
    >
      <Box
        display="flex"
        // reverse avatar/content order for own messages
        flexDirection={isOwn ? "row-reverse" : "row"}
        maxWidth="75%"
        gap={1}
      >
        {/* Avatar */}
        <Avatar
          src={`${user.imageURL}?${new Date().getTime()}`}
        />

        {/* Message bubble + timestamp */}
        <Stack spacing={0.5}>
          <Paper
            elevation={4}
            sx={{
              p: 1,
              bgcolor: isOwn ? "primary.main" : "green",
              color: isOwn ? "primary.contrastText" : "text.primary",
              borderRadius: 2,
            }}
          >
            <Typography variant="body2">{content}</Typography>
          </Paper>
          <Typography
            variant="caption"
            sx={{ alignSelf: isOwn ? "flex-end" : "flex-start", ml: 0.5 }}
          >
            {new Date(parsedTime).toLocaleTimeString()}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Message;
