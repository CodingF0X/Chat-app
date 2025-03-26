import { gql, useQuery } from "@apollo/client";
import { User } from "../models/User";

const GET_ME = gql`
  query Query {
    GET_ME {
      _id
      email
    }
  }
`;

const useGetMe = () => {
  return useQuery<User>(GET_ME);
};

export { useGetMe };
