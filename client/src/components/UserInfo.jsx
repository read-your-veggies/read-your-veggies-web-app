import React from 'react';
import { Query } from "react-apollo";
import { GET_USER_INFO } from '../apollo/localQueries.js';
import { withRouter } from "react-router-dom";


import HealthSpeedometer from './HealthSpeedometer.jsx';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleSpeedometerClick = this.handleSpeedometerClick.bind(this);
  }

  handleSpeedometerClick() {
    console.log('asdf');
    this.props.history.push('/health');
  }

  render() {
    return (
      <div id='user-info-container'>
        <Query query={GET_USER_INFO}>
          {({ data, client }) => {
            return (
              <h2 id="profile-link">{data.userInfo.displayName}</h2>
            );
          }}
        </Query>
          <div className='small-speedometer-click-wrapper' onClick={this.handleSpeedometerClick}>
            <HealthSpeedometer 
              height={100}
              width={150}
            />
          </div>
        <a id='logout-button' href='/logout'>Logout</a>
      </div>
    );
  }

}

export default withRouter(UserInfo);