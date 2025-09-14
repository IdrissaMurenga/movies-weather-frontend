'use client';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { HttpLink } from '@apollo/client/link/http';
import { SetContextLink } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI ?? 'http://localhost:4000/graphql',
  // credentials: 'include', // only if your API ALSO relies on cookies
});

const authLink = new SetContextLink(async (prevContext, _operation) => {
  const session = await getSession();
  const token =
    (session as any)?.accessToken || // we exposed this in session callback
    (session?.user as any)?.accessToken; // optional mirror

  return {
    ...prevContext,
    headers: {
      ...prevContext.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'network-only' },
    query: { fetchPolicy: 'network-only' },
    // mutate: { errorPolicy: 'all' }, // optional; fetchPolicy doesn't apply to mutations
  },
});

export function Apollo({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
