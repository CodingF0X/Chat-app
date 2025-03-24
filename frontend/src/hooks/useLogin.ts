import { useState } from "react";
import { API_URL } from "../constants/urls";
import { client } from "../constants/apollo-client";

interface LoginRequest {
  email: string;
  password: string;
}
const useLogin = () => {
  const [err, setErr] = useState<boolean>();

  const login = async (request: LoginRequest) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      if (!res.ok) {
        setErr(true);
        return;
      }
      setErr(false);
      await client.refetchQueries({ include: "active" });


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErr(false);
      console.log(error);
    }
  };
  return { login, err };
};

export default useLogin;
