import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

//this is our graphQl endpoint
const httpLink = new HttpLink({ uri: 'https://localhost:5000/graphql' });


const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});


ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App location = {location} />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('app'),
);
