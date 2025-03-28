import { useState } from "react";
import { API_URL } from "../constants/urls";
import { client } from "../constants/apollo-client";

interface LoginRequest {
  email: string;
  password: string;
}
const useLogin = () => {
  const [err, setErr] = useState<string>();

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
        if(res.status === 401){
          setErr('Invalid credentials');
        } else {
          setErr('Unknown error occurred'); 
        }
        return;
      }
      setErr('');
      await client.refetchQueries({ include: "active" });


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErr('Unknown error');
      console.log(error);
    }
  };
  return { login, err };
};

export default useLogin;
