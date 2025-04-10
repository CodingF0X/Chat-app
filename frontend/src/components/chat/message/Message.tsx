import { Avatar, Grid, Paper, Stack, Typography } from "@mui/material";
import { Message as msgGQL } from "../../../gql/graphql";

interface MessageProps {
  content: msgGQL["content"];
  timeStamp: msgGQL["createdAt"];
}
const Message = ({ content, timeStamp }: MessageProps) => {
  const parsedTime = parseInt(timeStamp);
  return (
    <>
      <Grid container mb={"1rem"}>
        <Grid size={0.7}>
          <Avatar />
        </Grid>
        <Grid size={11}>
          <Stack>
            <Paper
              elevation={8}
              sx={{
                width: "fit-content",
                p: "8px",
                background: "skyblue",
                color: "black",
                borderRadius: "10px",
              }}
            >
              <Typography variant="body1">{content}</Typography>
            </Paper>
            <Typography variant="caption" ml={"5px"} mt={"5px"}>
              {new Date(parsedTime).toLocaleTimeString()}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Message;
