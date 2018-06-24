import React from 'react';
import { Query } from "react-apollo";
import { GET_USER_INFO } from '../apollo/localQueries.js';

const UserInfo = () => {
  return (
      <div id='user-info-container'>
        <Query query={GET_USER_INFO}>
          {({ data, client }) => {
            return (
              <h2 id="profile-link">{data.userInfo.displayName}</h2>
            );
          }}
        </Query>
        <a href='/logout'>Logout</a>
    </div>
  )
}

export default UserInfo;