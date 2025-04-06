import { gql, useQuery } from "@apollo/client";
import { User } from "../models/User";

const GET_USERS = gql`
  query Query {
  Get_All_Users {
    _id
    email
  }
}
`;

const useGetUsers = () => {
  return useQuery<User>(GET_USERS);
};

export default useGetUsers;
