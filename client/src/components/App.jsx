import React, { Component } from 'react';
import { Route, withRouter } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_INFO = gql`
  {
    message
  }
`;

class App extends Component {
  render() {
    return(
      <Query query={GET_INFO}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <h1>{data.message}</h1>
          );
        }}
      </Query>
    );
  }
}



const Dogs = ({ onDogSelected }) => (
  <Query query={GET_DOGS}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <select name="dog" onChange={onDogSelected}>
          {data.dogs.map(dog => (
            <option key={dog.id} value={dog.breed}>
              {dog.breed}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);

export default withRouter(App);