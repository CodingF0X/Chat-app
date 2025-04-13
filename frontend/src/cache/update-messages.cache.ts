import { ApolloCache } from "@apollo/client";
import { GetMessagesDocument, Message } from "../gql/graphql";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateMessages = (cache: ApolloCache<any>, message: Message) => {
  const messagesQueryOptions = {
    query: GetMessagesDocument,
    variables: {
      chatId: message.chatId,
    },
  };
  const messages = cache.readQuery({ ...messagesQueryOptions });
  cache.writeQuery({
    ...messagesQueryOptions,
    data: {
      Get_All_Messages: (messages?.Get_All_Messages || []).concat(message),
    },
  });
};