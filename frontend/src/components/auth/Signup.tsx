import Auth from "./Auth";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useCreateUser from "../../hooks/useCreateUser";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/errors";
import useLogin from "../../hooks/useLogin";

const Signup = () => {
  const [createUser] = useCreateUser();
  const [err, setErr] = useState("");
  const { login } = useLogin();
  const handleSubmit = async (credentials: {
    email: string;
    password: string;
  }) => {
    const { email, password } = credentials;
    try {
      await createUser({
        variables: {
          createUserInput: {
            email,
            password,
          },
        },
      });
      // here to login immidiately after succesful user creation
      await login(credentials);
      setErr("");
    } catch (error) {
      const errMessage = extractErrorMessage(error);
      if (errMessage) {
        setErr(errMessage);
        return;
      }
    }
  };
  return (
    <div>
      <Auth submitLable="Signup" onSubmit={handleSubmit} error={err}>
        <Typography>
          Already have an account?{" "}
          <Typography
            component={Link}
            to="/login"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Click here to login
          </Typography>
        </Typography>
      </Auth>
    </div>
  );
};

export default Signup;
