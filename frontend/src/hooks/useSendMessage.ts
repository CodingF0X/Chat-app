import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { getMessagesDocuments } from "./useGetMessages";

const createMessageDocument = graphql(`
  mutation createMessage($createMessageInput: CreateMessageInput!) {
    Create_New_Message(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useSendMessage = (chatId: string) => {
  return useMutation(createMessageDocument, {
    update(cache, { data }) {
      const MessagesQueryOptions = {
        query: getMessagesDocuments,
        variables: { chatId },
      };

      const messages = cache.readQuery({ ...MessagesQueryOptions });
      //takes all the key/value pairs from the MessagesQueryOptions object and includes them in a new object.
      ///This is useful for ensuring consistency and avoiding repetition

      if (!messages || !data?.Create_New_Message) return;

      cache.writeQuery({
        ...MessagesQueryOptions,
        data: {
          Get_All_Messages: [
            ...messages.Get_All_Messages,
            data.Create_New_Message,
          ],
        },
      });
    },
  });
};

export default useSendMessage;
