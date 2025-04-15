import { useCallback, useState } from "react";
import { API_URL } from "../constants/urls";

const useCountMessages = (chatId: string) => {
  const [err, setErr] = useState<string>();
  const [messagesCount, setMessagesCount] = useState<number | undefined>();

  const countMessages = useCallback(async () => {
    const res = await fetch(`${API_URL}/messages/count?chatId=${chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      setErr("Unknown error occurred");

      return;
    }
    const data = await res.json();
    
    setMessagesCount(parseInt(data[0].messages));
  }, [chatId]);
  return { messagesCount, countMessages, err };
};

export default useCountMessages;
