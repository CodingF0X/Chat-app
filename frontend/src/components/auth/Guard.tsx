import { JSX } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { exludedRoutes } from "../../constants/excluded-routes";

interface GuardProps {
  children: JSX.Element;
}
const Guard = ({ children }: GuardProps) => {
  const { data: user } = useGetMe();
  console.log(user);
  /* since we wrapped the  <RouterProvider router={Routes} /> with this guard,
  then it will be considered as the children component, thus, every child component come with it.
   */
  return (
    <>
      {exludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
