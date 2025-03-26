import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Toolbar } from "@mui/material";
import Branding from "./Branding";
import Mobile_Nav from "./mobile/Mobile_Nav";
import Mobile_Branding from "./mobile/Mobile_Branding";
import Desktop_Nav from "./Desktop_Nav";
import Settings from "./Settings";

const pages = ["Products", "Pricing", "Blog"];

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <Mobile_Nav pages={pages} />
          <Mobile_Branding />
          <Desktop_Nav pages={pages} />
          <Settings />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
