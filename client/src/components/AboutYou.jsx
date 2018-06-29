import React from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_USER_FROM_DB } from '../apollo/serverQueries.js';
import {GET_USER_INFO} from '../apollo/localQueries.js';
import HealthSpeedometer from './HealthSpeedometer.jsx';




class AboutYou extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Query query={GET_USER_INFO}>
          {(({data}) => {
            return (
              <Query query={GET_USER_FROM_DB} variables={{ _id: data.userInfo.userId }}>
                {({ loading, error, data }) => {
                  if (loading) return "Loading...";
                  if (error) return `Error! ${error.message}`;
                  var userStance = JSON.parse(data.user.user_stance);
                  var locPolRatio = JSON.parse(data.user.locPolRatio);
                  var homePolRatio = JSON.parse(data.user.homePolRatio);
                  var readingStance = JSON.parse(data.user.reading_stance[0]);
                  return (
                    <div>
                    <p>Your Overall Political Stance: {userStance}</p>
                    <p>The Political Stance of Your Current City: {locPolRatio}</p>
                    <p>The Political Stance of Your Hometown: {homePolRatio}</p>
                    <p>The Political Stance of Your Reading Habits: {readingStance}</p>
                    </div>
                  );
                }}
              </Query>
            );
          }
          )}
        </Query>
    );
  }

}

export default withRouter(AboutYou);