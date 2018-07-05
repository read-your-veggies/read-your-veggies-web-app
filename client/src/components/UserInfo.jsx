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

    console.log('user info props', props);
  }

  handleSpeedometerClick() {
    console.log('speedometer props', this.props)
    if (this.props.displayName !== 'Login') {
      this.props.history.push('/health');
    }
  }

  render() {

    var userId = this.props.userId;
    var tooltip = <Tooltip id="modal-tooltip">{this.props.displayName === 'Login' ? 'Login' : 'Logout?'}</Tooltip>;

    return (
      <div id='user-info-container'>
        <h2 id="profile-link">{' '}
          <OverlayTrigger overlay={tooltip}>
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
              return (
                <div>
                  <p>Weekly Media Health:</p>
                  <Line percent={data.user.health / 50} strokeWidth={4} trailWidth={4} strokeColor="red" />
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