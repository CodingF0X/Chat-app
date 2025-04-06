import { JSX, useEffect } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { exludedRoutes } from "../../constants/excluded-routes";
import { authenticatedVar } from "../../constants/authenticated";
import usePath from "../../hooks/usePaths";

interface GuardProps {
  children: JSX.Element;
}
const Guard = ({ children }: GuardProps) => {
  const { data: user } = useGetMe();
  const { path } = usePath();
  console.log(user);

  useEffect(() => {
    if (user) authenticatedVar(true);
  }, [user]);
  /* since we wrapped the  <RouterProvider router={Routes} /> with this guard,
  then it will be considered as the children component, thus, every child component come with it.
   */
  return (
    <>
      {exludedRoutes.includes(path)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
