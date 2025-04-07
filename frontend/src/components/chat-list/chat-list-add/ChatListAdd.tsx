import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useCreateChat from "../../../hooks/useCreateChat";

interface ChatListAddProps {
  open: boolean;
  handleClosed: () => void;
}
const ChatListAdd = ({ open, handleClosed }: ChatListAddProps) => {
  const [isPrivate, setIsPrivate] = useState(true);
  const [name, setName] = useState<string|undefined>("");
  const [createChat] = useCreateChat();
  return (
    <Modal open={open} onClose={handleClosed}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            {" "}
            Add Chat
          </Typography>

          <FormGroup>
            <FormControlLabel
              label="Private"
              style={{ width: 0 }}
              control={
                <Switch
                  value={isPrivate}
                  onChange={() => setIsPrivate(!isPrivate)}
                  defaultChecked
                />
              }
            />
          </FormGroup>
          {isPrivate ? (
            <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for Users to Add"
              />
              <IconButton>
                <Search />
              </IconButton>
            </Paper>
          ) : (
            <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Chat Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Paper>
          )}

          <Button
            variant="outlined"
            onClick={() => {
              createChat({
                variables: {
                  createChatInput: {
                    isPrivate: isPrivate,
                    participants: [],
                    name: name||undefined,
                  },
                },
              });
              handleClosed();
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChatListAdd;
