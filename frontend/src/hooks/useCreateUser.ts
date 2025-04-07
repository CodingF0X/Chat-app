import { useMutation } from "@apollo/client";
import { graphql } from "../gql";


/*copied the query text from the apollo server ( localhost:3000/graphql) 
where the mutation happens. similarly copy the text for other mutations and queries
to perform the rest of the api operations.
*/
const createUserDocument = graphql(`
  mutation Mutation($createUserInput: CreateUserInput!) {
    Create_New_User(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`);

const useCreateUser = () => {
  return useMutation(createUserDocument);
};

export default useCreateUser;
