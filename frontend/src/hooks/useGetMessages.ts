import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { GetMessagesQueryVariables } from "../gql/graphql";

export const getMessagesDocuments = graphql(`
  query getMessages($chatId: String!) {
    Get_All_Messages(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

const useGetMessages = (variables: GetMessagesQueryVariables) => {
  return useQuery(getMessagesDocuments, { variables });
};

export default useGetMessages;
