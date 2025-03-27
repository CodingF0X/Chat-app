import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Toolbar, Typography } from "@mui/material";
import Branding from "./Branding";
import Mobile_Nav from "./mobile/Mobile_Nav";
import Mobile_Branding from "./mobile/Mobile_Branding";
import Desktop_Nav from "./Desktop_Nav";
import Settings from "./Settings";
import Routes from "../Routes";
import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "../../constants/authenticated";

const pages = [""];

const Header = () => {
  const authenticated = useReactiveVar(authenticatedVar);
  return (
    <AppBar position="static" sx={{color:'white', background:'orange'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <Mobile_Nav pages={pages} />
          <Mobile_Branding />
          <Desktop_Nav pages={pages} />
          {authenticated ? <Settings /> : (
            <Typography component='a' onClick={()=> Routes.navigate('/login')}>
              Login

            </Typography>
          )}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
