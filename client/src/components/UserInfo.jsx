import React from 'react';
import { withRouter } from "react-router-dom";
import HealthSpeedometer from './HealthSpeedometer.jsx';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';


class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleSpeedometerClick = this.handleSpeedometerClick.bind(this);
  }

  handleSpeedometerClick() {
    console.log('speedometer props', this.props)
    if (this.props.displayName !== 'John Doe') {
      this.props.history.push('/health');
    }
  }

  render() {

    var tooltip = <Tooltip id="modal-tooltip">{this.props.displayName === 'John Doe' ? 'Login' : 'Logout?'}</Tooltip>;

    return (
      <div id='user-info-container'>
        <h2 id="profile-link">{' '}
          <OverlayTrigger overlay={tooltip}>
            <a href="/logout">{this.props.displayName}</a>
          </OverlayTrigger>{' '}
        </h2>
        <div className='small-speedometer-click-wrapper' onClick={this.handleSpeedometerClick}>
          <HealthSpeedometer 
            height={100}
            width={150}
          />
        </div>
      </div>
    );
  }

}

export default withRouter(UserInfo);