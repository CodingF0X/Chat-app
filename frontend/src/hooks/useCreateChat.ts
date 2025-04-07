import { useMutation } from "@apollo/client";
import { graphql } from "../gql";

const createChatDocument = graphql(`
  mutation Create_New_Chat($createChatInput: CreateChatInput!) {
    Create_New_Chat(createChatInput: $createChatInput) {
      _id
      userId
      isPrivate
      participants
      name
    }
  }
`);

const useCreateChat = () => {
    return useMutation(createChatDocument)
}

export default useCreateChat;
