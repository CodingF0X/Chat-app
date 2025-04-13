import { useSubscription } from "@apollo/client";
import { graphql } from "../gql";
import { SubscriptionMessage_CreatedArgs } from "../gql/graphql";
import { updateLatestMessage } from "../cache/latest-message.cache";

const messageCreatedDocument = graphql(`
  subscription messageCreated($chatId: String!) {
    Message_Created(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

const useMessageCreated = (variables: SubscriptionMessage_CreatedArgs) => {
  return useSubscription(messageCreatedDocument, {
    variables,
    onData: ({ client, data }) => {
      if (data.data) {
        updateLatestMessage(client.cache, data.data.Message_Created);
      }
    },
  });
};

export default useMessageCreated;
