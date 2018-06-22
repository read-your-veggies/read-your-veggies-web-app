import React, { Component } from 'react';
import { Route, withRouter } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import axios from 'axios';

const GET_MESSAGE_FROM_SERVER = gql`
  {
    message
  }
`;

const GET_TEAM_NAME_FROM_LOCAL_STATE = gql`
  query {
    teamName @client
  }
`;

class App extends Component {
  render() {
    return(
      <div>
      <Query query={GET_MESSAGE_FROM_SERVER}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <h1>{data.message}</h1>
          );
        }}
      </Query>
      <Query query={GET_TEAM_NAME_FROM_LOCAL_STATE}>
      {({ data }) => {
        return (
          <h1>{data.teamName}</h1>
        );
      }}
    </Query>
    </div>
    );
  }
}

export default withRouter(App);