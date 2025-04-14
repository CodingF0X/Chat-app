import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { QueryFind_ChatsArgs } from "../gql/graphql";

const getChatsDocument = graphql(`
  query getChats($skip: Int!, $limit: Int!) {
    Find_Chats(skip: $skip, limit: $limit) {
      ...ChatFragment
    }
  }
`);

const useGetChats = (variables: QueryFind_ChatsArgs) => {
  return useQuery(getChatsDocument, {variables});
};

export default useGetChats;
