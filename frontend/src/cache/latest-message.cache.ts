import { ApolloCache } from "@apollo/client";
import { GetChatsDocument, Message } from "../gql/graphql";

export const updateLatestMessage = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cache: ApolloCache<any>,
  message: Message
) => {
  const chats = [
    ...(cache.readQuery({ query: GetChatsDocument })?.Find_Chats || []),
  ];
  const chachedChatIndex = chats?.findIndex(
    (chat) => chat._id === message.chatId
  );
  if (chachedChatIndex === -1) return;

  const cachedChat = chats[chachedChatIndex];

  const chachedChatCopy = { ...cachedChat };
  chachedChatCopy.latestMessage = message;

  chats[chachedChatIndex] = chachedChatCopy;

  cache.writeQuery({
    query: GetChatsDocument,
    data: {
      Find_Chats: chats,
    },
  });
};
