import Auth from "./Auth";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Auth submitLable="Signup" onSubmit={async () => {}}>
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
