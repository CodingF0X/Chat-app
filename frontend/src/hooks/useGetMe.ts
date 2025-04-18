import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const GET_ME = graphql(`
  query GetMe {
    GET_ME {
      _id
      email
    }
  }
`);

const useGetMe = () => {
  return useQuery(GET_ME);
};

export { useGetMe };
