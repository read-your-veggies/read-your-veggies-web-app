import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import apolloStateDefaults from './apollo/apolloStateDefaults';

import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import {ApolloLink} from 'apollo-boost'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {withClientState} from 'apollo-link-state';


// Set up Cache
const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults: apolloStateDefaults,
  resolvers: {}, //TODO - figure out what these are.
});

// Initialize the Apollo Client with a link to the local state
const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
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
