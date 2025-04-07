import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { GetChatQueryVariables } from "../gql/graphql";

const getChatDocument = graphql(`
  query getChat($id: String!) {
    Find_Single_Chat(_id: $id) {
    ...ChatFragment
    }
  }
`);

const useGetChat = (variables: GetChatQueryVariables) => {
  return useQuery(getChatDocument,{variables});
};

export default useGetChat;
