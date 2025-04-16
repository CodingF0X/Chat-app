import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./Home";
import Chat from "./chat/Chat";
import Profile from "./profile/Profile";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/chats/:_id",
    element: <Chat />,
  },
]);

export default Routes;
