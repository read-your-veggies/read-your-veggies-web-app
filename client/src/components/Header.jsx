import React from 'react';
import { Query } from "react-apollo";
import { GET_USER_INFO } from '../apollo/localQueries.js';

const Header = () => {
  return (
    <div className="header">
      <img id="logo" src="./assets/logo.png" />
      <div className="header-text">
        <h1 id="read-your-veggies">Read-Your-Veggies.com</h1>
        <h2>A news app for a balanced media diet</h2>
      </div>
      <Query query={GET_USER_INFO}>
        {({ data, client }) => {
          return (
            <h2 id="profile-link">{data.userInfo.displayName}</h2>
          );
        }}
      </Query>
    </div>
  )
}

export default Header;