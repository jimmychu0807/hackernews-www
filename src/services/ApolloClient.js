import { ApolloClient } from "apollo-boost";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import config from '../config';

const httpLink = createHttpLink({
  uri: config.GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  let token = localStorage.getItem('user') ?
    JSON.parse(localStorage.getItem('user')).token : null;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all'
  }
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  defaultOptions,
})

export default client;
