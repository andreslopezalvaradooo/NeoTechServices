// src/lib/apollo-server-client.ts
import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { cookies } from "next/headers";

export const { getClient, query, PreloadQuery } = registerApolloClient(
  async () => {
    const cookieStore = await cookies();

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: "http://localhost:4000/graphql",
        credentials: "include",
        headers: {
          cookie: cookieStore.toString(),
        },
      }),
    });
  },
);
