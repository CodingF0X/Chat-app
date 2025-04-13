import { useSubscription } from "@apollo/client";
import { graphql } from "../gql";
import { SubscriptionMessage_CreatedArgs } from "../gql/graphql";
import { updateLatestMessage } from "../cache/latest-message.cache";
import { updateMessages } from "../cache/update-messages.cache";

const messageCreatedDocument = graphql(`
  subscription messageCreated($chatIds: [String!]!) {
    Message_Created(chatIds: $chatIds) {
      ...MessageFragment
    }
  }
`);

const useMessageCreated = (variables: SubscriptionMessage_CreatedArgs) => {
  return useSubscription(messageCreatedDocument, {
    variables,
    onData: ({ client, data }) => {
      if (data.data) {
        updateMessages(client.cache, data.data.Message_Created)
        updateLatestMessage(client.cache, data.data.Message_Created);
      }
    },
  });
};

export default useMessageCreated;
