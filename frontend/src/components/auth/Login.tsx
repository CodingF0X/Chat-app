import { Typography } from "@mui/material";
import Auth from "./Auth";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Auth submitLable="Login" onSubmit={async () => {}}>
        <Typography>
          Don't have an account?{" "}
          <Typography
            component={Link}
            to="/signup"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Click here to Sign Up
          </Typography>
        </Typography>
      </Auth>
    </div>
  );
};

export default Login;
