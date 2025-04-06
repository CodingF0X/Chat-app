import { gql, useMutation } from "@apollo/client";
import { User } from "../models/User";

interface CreateUserInput {
  email: string;
  password: string;
}
/*copied the query text from the apollo server ( localhost:3000/graphql) 
where the mutation happens. similarly copy the text for other mutations and queries
to perform the rest of the api operations.
*/
const CREATE_USER = gql`
  mutation Create_New_User($createUserInput: CreateUserInput!) {
  Create_New_User(createUserInput: $createUserInput) {
    _id
    email
  }
}
`;

const useCreateUser = () => {
  return useMutation<User, { createUserInput: CreateUserInput }>(CREATE_USER);
};

export default useCreateUser;
