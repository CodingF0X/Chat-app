import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const getChatsDocument = graphql(`
  query getChats {
    Find_Chats {
      ...ChatFragment
    }
  }
`);

const useGetChats = () => {
  return useQuery(getChatsDocument);
};

export default useGetChats;
