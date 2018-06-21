import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

var defaults;
var resolvers;
var typeDefs;

const client = new ApolloClient({
  uri: 'https://localhost:5000/graphql',
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
});


ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App location = {location} />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('app'),
);
