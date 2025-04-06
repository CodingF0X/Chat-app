import {
  Container,
  createTheme,
  CssBaseline,
  Grid2,
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
  console.log(path);
  const Routes = () => {
    return (
      <Container>
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
          {path === "/" ? (
            <Grid2 container>
              <Grid2 size={3}>
                <ChatList />
              </Grid2>

              <Grid2 size={9}>
                <Routes />
              </Grid2>
            </Grid2>
          ) : (
            <Routes />
          )}
        </Guard>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
