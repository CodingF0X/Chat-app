import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import Routes from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./constants/apollo-client";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          <RouterProvider router={Routes} />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
