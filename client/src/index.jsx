import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import apolloStateDefaults from './apollo/apolloStateDefaults';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client-preset';
import {ApolloLink} from 'apollo-client-preset';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {withClientState} from 'apollo-link-state';
import { Mutation } from "react-apollo";
import { UPDATE_USER_INFO } from './apollo/localQueries.js';

// Set up Cache
const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults: apolloStateDefaults,
  resolvers: {
    Mutation: {
      updateUserInfo: (_, { theDisplayName, theProvider, theUserId }, { cache }) => {
        client.writeData({ data: { userInfo: {
          __typename:'userInfo',
          displayName: theDisplayName,
          provider: theProvider,
          userId: theUserId,
        } } });
      }
    }
  },
});

// Initialize the Apollo Client with a link to the local state
const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: '/graphql'
    })
  ]),
  cache: cache,
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Mutation mutation={UPDATE_USER_INFO}>
      {(updateUserInfo => <App location = {location} updateUserInfo = {updateUserInfo} />)}
      </Mutation>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('app'),
);
