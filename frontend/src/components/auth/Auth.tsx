import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

interface AuthProps {
  submitLable: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode; // to pass children to the Auth component
}
const Auth = ({ submitLable, onSubmit, children }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Stack
      spacing={3}
      sx={{
        width: "100%",
        maxWidth: {
          xs: "90%",
          sm: "70%",
          md: "50%",
          lg: "40%",
          xl: "30%",
        },
        margin: "0 auto",
        padding: {
          xs: 2,
          sm: 3,
          md: 4,
          lg: 5,
          xl: 6,
        },
        borderRadius: 1,
      }}
    >
      <TextField
        type="email"
        label="email"
        variant="outlined"
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        type="password"
        label="password"
        variant="outlined"
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        onClick={() => onSubmit({ email, password })}
      >
        {submitLable}
      </Button>

      {children}
    </Stack>
  );
};

export default Auth;
