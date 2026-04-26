import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

//no estoy usando esto en ningun lado, no quitar hasta confirmar que no se necesita
export const { getClient, query, PreloadQuery } = registerApolloClient(
  async () => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        credentials: "same-origin",
      }),
    });
  },
);
