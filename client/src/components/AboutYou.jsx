import React from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_USER_STANCE_INFO } from '../apollo/serverQueries.js';
import {GET_USER_INFO} from '../apollo/localQueries.js';
import HealthSpeedometer from './HealthSpeedometer.jsx';
import Sidebar from './Sidebar.jsx';


class AboutYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divHeight: '',
    }
  }

  componentDidMount() {
    this.setState({divHeight: window.innerHeight - 147 + 'px'});
  }

  render() {
    return (
      <div id='about-you-dash'>
        <Sidebar />
        <div id='about-you-inner-content' style={{height: this.state.divHeight}}>
          <Query query={GET_USER_INFO}>
              {(({data}) => {
                return (
                  <Query query={GET_USER_STANCE_INFO} variables={{ _id: data.userInfo.userId }}>
                    {({ loading, error, data }) => {
                      if (loading) return "Loading...";
                      if (error) return `Error! ${error.message}`;
                      var userStance = JSON.parse(data.user.user_stance);
                      var onboardStance = JSON.parse(data.user.onboard_stance);
                      var locPolRatio = JSON.parse(data.user.locPolRatio);
                      var homePolRatio = JSON.parse(data.user.homePolRatio);
                      var readingStance = JSON.parse(data.user.reading_stance[0]);
                      return (
                        <div>
                        <h1>Your Overall Political Stance:</h1>
                        <HealthSpeedometer 
                          height={100}
                          width={150}
                          value = {userStance}
                          startColor="blue"
                          endColor="red"
                          min={-1}
                          max={1}
                        />
                        <h1>Your Self Reported Political Stance:</h1>
                        <HealthSpeedometer 
                          height={100}
                          width={150}
                          value = {onboardStance}
                          startColor="blue"
                          endColor="red"
                          min={-1}
                          max={1}
                        />
                        <h1>The Political Stance of Your Current City ({data.user.location}):</h1>
                        <HealthSpeedometer 
                          height={100}
                          width={150}
                          value = {locPolRatio}
                          startColor="blue"
                          endColor="red"
                          min={-1}
                          max={1}
                        />
                        <h1>The Political Stance of Your Hometown ({data.user.hometown}):</h1>
                        <HealthSpeedometer 
                          height={100}
                          width={150}
                          value = {homePolRatio}
                          startColor="blue"
                          endColor="red"
                          min={-1}
                          max={1}
                        />
                        <h1>The Political Stance of Your Reading Habits:</h1>
                        <HealthSpeedometer 
                          height={100}
                          width={150}
                          value = {readingStance}
                          startColor="blue"
                          endColor="red"
                          min={-1}
                          max={1}
                        />
                        </div>
                      );
                    }}
                  </Query>
                );
              }
              )}
            </Query>
          </div>
        </div>
    );
  }

}

export default withRouter(AboutYou);