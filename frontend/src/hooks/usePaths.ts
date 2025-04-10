import { useEffect, useState } from "react";
import routes from "../components/Routes";

// this hook is to keep track of the path
const usePath = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    routes.subscribe((state) => {
      setPath(state.location.pathname);
    });
  }, []);

  return { path };
};

export default usePath;
