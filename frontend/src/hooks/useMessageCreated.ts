import { useSubscription } from "@apollo/client";
import { graphql } from "../gql";
import { SubscriptionMessage_CreatedArgs } from "../gql/graphql";

const messageCreatedDocument = graphql(`
  subscription messageCreated($chatId: String!) {
    Message_Created(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

const useMessageCreated = (variables: SubscriptionMessage_CreatedArgs) => {
  return useSubscription(messageCreatedDocument, { variables });
};

export default useMessageCreated;
