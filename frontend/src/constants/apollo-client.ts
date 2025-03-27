import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_URL } from "./urls";
import { onError } from "@apollo/client/link/error";
import { exludedRoutes } from "./excluded-routes";
import onLogout from "../utils/onLogout";

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
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
