import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { QueryGet_All_MessagesArgs } from "../gql/graphql";

export const getMessagesDocuments = graphql(`
  query getMessages($skip: Int!, $limit: Int!, $chatId: String!) {
    Get_All_Messages(skip: $skip, limit: $limit, chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

const useGetMessages = (variables: QueryGet_All_MessagesArgs) => {
  return useQuery(getMessagesDocuments, { variables });
};

export default useGetMessages;
