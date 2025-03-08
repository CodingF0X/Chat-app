import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: "HomePage 3lkaa",
  },
  {
    path: "/login",
    element: <Login/>,
  },

  {
    path:'/signup',
    element: <Signup/>,
  }
]);

export default Routes;
