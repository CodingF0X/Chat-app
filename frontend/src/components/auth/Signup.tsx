import Auth from "./Auth";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useCreateUser from "../../hooks/useCreateUser";

const Signup = () => {
  const [createUser] = useCreateUser();

  const handleSubmit = async (credentials: {
    email: string;
    password: string;
  }) => {
    const { email, password } = credentials;
    await createUser({
      variables: {
        createUserInput: {
          email,
          password,
        },
      },
    });
  };
  return (
    <div>
      <Auth submitLable="Signup" onSubmit={handleSubmit}>
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
