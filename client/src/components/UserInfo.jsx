import React from 'react';
import { withRouter } from "react-router-dom";
import HealthSpeedometer from './HealthSpeedometer.jsx';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import { GET_USER_HEALTH } from '../apollo/serverQueries.js';
import { Query } from "react-apollo";
import { Line } from 'rc-progress';



class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleSpeedometerClick = this.handleSpeedometerClick.bind(this);
  }

  handleSpeedometerClick() {
    console.log('speedometer props', this.props)
    if (this.props.displayName !== 'Login') {
      this.props.history.push('/health');
    }
  }

  render() {
    var userId = this.props.userId;
    var loginTip = <Tooltip id="modal-tooltip">{this.props.displayName === 'Login' ? 'Login' : 'Logout?'}</Tooltip>;
    
    return (
      <div id='user-info-container'>
        <h2 id="profile-link">{' '}
          <OverlayTrigger overlay={loginTip}>
            <a href={this.props.displayName === 'Login' ? '/auth/facebook' : '/logout'}>{this.props.displayName}</a>
          </OverlayTrigger>{' '}
        </h2>
        <div className='small-speedometer-click-wrapper' onClick={this.handleSpeedometerClick}>
          {userId !== '1234567890' 
            ?
            <Query
              query={GET_USER_HEALTH}
              variables={{ _id: userId }}
            >
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              
              var veggieGoal = data.user.onboard_information === 'NEED_ON_BOARDING' ? 30 : JSON.parse(data.user.onboard_information).veggieSlider;
              var mediaHealth = data.user.health / veggieGoal * 100;
              var healthBarColor;

              var healthBarTip = <Tooltip id="modal-tooltip">{data.user.health} Veggies See Health</Tooltip>;
              
              if (mediaHealth <= 39) {
                healthBarColor = 'red';
              } else if (mediaHealth >= 40 && mediaHealth < 75 ) {
                healthBarColor = 'yellow';
              } else {
                healthBarColor = 'green';
              }

              return (
                <div>
                  <OverlayTrigger overlay={healthBarTip} placement='bottom'>
                  <div>
                      <p>Weekly Veggie Goal:</p>
                      <Line percent={mediaHealth} strokeWidth={4} trailWidth={4} strokeColor={healthBarColor} />
                      <div id='line-start'>0</div>
                      <div id='line-end'>{veggieGoal}</div>
                  </div>
                  </OverlayTrigger>
                </div>
              );
            }}
          </Query>
          :
          null
          }
        </div>
      </div>
    );
  }

}

export default withRouter(UserInfo);