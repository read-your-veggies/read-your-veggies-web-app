import React from 'react';
import { withRouter } from "react-router-dom";


import HealthSpeedometer from './HealthSpeedometer.jsx';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleSpeedometerClick = this.handleSpeedometerClick.bind(this);
  }

  handleSpeedometerClick() {
    if (this.props.displayName !== 'John Doe') {
      this.props.history.push('/health');
    }
  }

  render() {
    return (
      <div id='user-info-container'>
        <h2 id="profile-link">{this.props.displayName}</h2>
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