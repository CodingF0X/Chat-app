import { useCallback, useState } from "react";
import { API_URL } from "../constants/urls";

const useCountChats = () => {
  const [err, setErr] = useState<string>();
  const [chatsCount, setChatsCount] = useState<number | undefined>();

  const countChats = useCallback(async () => {
    const res = await fetch(`${API_URL}/chats/count`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!res.ok) {
      setErr("Unknown error occurred");

      return;
    }
    // const data = await res.text();
    setChatsCount(parseInt(await res.text()));
    console.log(chatsCount);
  }, []);

  return { chatsCount, countChats, err };
};

export default useCountChats;
