<<<<<<< HEAD
import UserInfo from './UserInfo.jsx';
import React from 'react';
=======
import React from 'react';
import { Query } from "react-apollo";
import { GET_USER_INFO } from '../apollo/localQueries.js';
>>>>>>> dc8859b43cb153c3e227050c86f1c7edbde653cb

const Header = () => {
  return (
    <div className="header">
<<<<<<< HEAD
      <div id='logo-container'>
        <img id="logo" src="./assets/logo.png" />
      </div>
=======
      <img id="logo" src="./assets/logo.png" />
>>>>>>> dc8859b43cb153c3e227050c86f1c7edbde653cb
      <div className="header-text">
        <h1 id="read-your-veggies">Read-Your-Veggies.com</h1>
        <h2>A news app for a balanced media diet</h2>
      </div>
<<<<<<< HEAD
      <UserInfo />
=======
      <Query query={GET_USER_INFO}>
        {({ data, client }) => {
          return (
            <h2 id="profile-link">{data.userInfo.displayName}</h2>
          );
        }}
      </Query>
>>>>>>> dc8859b43cb153c3e227050c86f1c7edbde653cb
    </div>
  )
}

export default Header;