import { useMutation } from "@apollo/client";
import { graphql } from "../gql";

const createMessageDocument = graphql(`
  mutation createMessage($createMessageInput: CreateMessageInput!) {
    Create_New_Message(createMessageInput: $createMessageInput) {
      _id
      content
      sender
      createdAt
    }
  }
`);

const useSendMessage = () => {
    return useMutation(createMessageDocument)
}

export default useSendMessage;