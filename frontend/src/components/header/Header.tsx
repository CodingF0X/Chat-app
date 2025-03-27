import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Toolbar, Typography } from "@mui/material";
import Branding from "./Branding";
import Mobile_Nav from "./mobile/Mobile_Nav";
import Mobile_Branding from "./mobile/Mobile_Branding";
import Desktop_Nav from "./Desktop_Nav";
import Settings from "./Settings";
import { useGetMe } from "../../hooks/useGetMe";
import Routes from "../Routes";

const pages = [""];

const Header = () => {
  const { data:user } = useGetMe();
  return (
    <AppBar position="static" sx={{color:'white', background:'orange'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <Mobile_Nav pages={pages} />
          <Mobile_Branding />
          <Desktop_Nav pages={pages} />
          {user ? <Settings /> : (
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
