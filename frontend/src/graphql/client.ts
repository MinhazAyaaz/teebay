/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT as string,
  fetchOptions: { mode: 'cors' },
});

const authLink = new SetContextLink((prevContext, operation) => {
  let userId: string | null = null;
  try {
    if (typeof window !== 'undefined') {
      userId = window.localStorage.getItem('x-user-id');
    }
  } catch {
    userId = null;
  }
  
  const existingHeaders = (prevContext?.headers as Record<string, string> | undefined) ?? {};

  return {
    headers: {
      ...existingHeaders,
      ...(userId ? { 'x-user-id': userId } : {}),
    },
  };
});


export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


