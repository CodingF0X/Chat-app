import { Typography } from "@mui/material";
import { Message as msgGQL } from "../../../gql/graphql";

interface MessageProps {
  content: msgGQL["content"];
}
const Message = ({ content }: MessageProps) => {
  return (
    <>
      <Typography>{content}</Typography>
    </>
  );
};

export default Message;
