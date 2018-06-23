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

// Set up Cache
const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults: apolloStateDefaults,
  resolvers: {
    Mutation: {
      updateUserInfo: (_, { theDisplayName, theProvider, theProviderId }, { cache }) => {
        console.log(theDisplayName, theProvider, theProviderId);
        client.writeData({ data: { userInfo: {
          __typename:'userInfo',
          displayName: theDisplayName,
          provider: theProvider,
          providerId: theProviderId,
        } } });
        console.log('written');
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
      <App location = {location} />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('app'),
);
