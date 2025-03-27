import { useState } from "react";
import { API_URL } from "../constants/urls";

const useLogout = () => {
  const [err, setErr] = useState<string>();

  const logout = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
      });
      if (!res.ok) {
        if (res.status === 404) {
          setErr("Network Error");
        } else {
          setErr("Unknown error occurred");
        }
        return;
      }
      setErr("");
    } catch (error) {
      setErr("Unknown error");
      console.log(error);
    }
  };
  return { logout, err };
};

export default useLogout;
