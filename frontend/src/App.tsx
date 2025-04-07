import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import routes from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import ChatList from "./components/chat-list/ChatList";
import usePath from "./hooks/usePaths";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const { path } = usePath();
  const pathsVar = path === "/" || path.includes("chats");

  const Routes = () => {
    return (
      <Container sx={{height:'80vh'}}>
        <RouterProvider router={routes} />
      </Container>
    );
  };
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          {pathsVar ? (
            <Grid container>
              <Grid size={3}>
                <ChatList />
              </Grid>

              <Grid size={9}>
                <Routes />
              </Grid>
            </Grid>
          ) : (
            <Routes />
          )}
        </Guard>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
