import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { API_URL, API_WS_URL } from "./urls";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { exludedRoutes } from "./excluded-routes";
import onLogout from "../utils/onLogout";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const logoutLink = onError((err) => {
  if (
    err.graphQLErrors?.length &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (err.graphQLErrors[0].extensions?.originalError as any)?.statusCode === 401
  ) {
    if (!exludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

/*Send GraphQL requests to the backend server.
it points to the GraphQL endpoint http://localhost:3000/graphql 
*/
const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const wsLink = new GraphQLWsLink(
  createClient({ url: `ws://${API_WS_URL}/graphql` })
);


// now to determine whether the operation is GQL query or subscription,
// we get the operation definition, which returns a boolean value,
// if the left operand is true, then it's a subscription, otherwise it's a query.
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return ( //boolean
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,// Left operand: if the return was true then we consume this link
  httpLink // Right operand: else we consume the normal httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(link),
});

/* 
Concat():
What it does: Combines two links into a single chain.

Order matters:
Requests flow from left to right (logoutLink ➔ httpLink).
Responses flow from right to left (httpLink ➔ logoutLink).
*/

/* 
Flow Explaination:
1- A GraphQL query is executed.

2-The request passes through logoutLink (no action unless there's an error).

3-httpLink sends the request to the server.

4- When the response returns:

If there's a 401 error, logoutLink handles the logout.

If successful, the response is cached and returned to the UI.
*/
export { client };
