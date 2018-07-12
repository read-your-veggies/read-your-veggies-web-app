import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_USER_STANCE_INFO } from '../apollo/serverQueries.js';
import {GET_USER_INFO} from '../apollo/localQueries.js';
import HealthSpeedometer from './HealthSpeedometer.jsx';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import { withRouter } from 'react-router-dom';
import UserInfo from './UserInfo.jsx';


class Sidebar extends Component {

  state = {
    divHeight: ''
  };

  componentDidMount() {
    this.setState({divHeight: window.innerHeight - 100 + 'px'});
  }

  goTo = (displayName, link) => {
    if (displayName !== 'Login') {
      this.props.history.push(`/${link}`);
    }
  }

  render() {
    const tooltip = <Tooltip id="modal-tooltip">See Your Report</Tooltip>;
    const userId = this.props.getUserInfo.data.userInfo.userId;
    const displayName = this.props.getUserInfo.data.userInfo.displayName;

    return (
      <div id='dash-sidebar' style={{height: this.state.divHeight}}>
        <Query query={GET_USER_INFO}>
          {(({data}) => {
            return (
              <Query fetchPolicy='network-only' query={GET_USER_STANCE_INFO} variables={{ _id: data.userInfo.userId }}>
                {({ loading, error, data }) => {
                  if (loading) return null;
                  if (error) return `Error! ${error.message}`;
                  const userStance = JSON.parse(data.user.user_stance);
                  return (
                    <div id='dash-sidebar-inner' style={{height: this.state.divHeight}}>
                      <div onClick={() => this.goTo(displayName, "dashboard")} className='sidebar-container'>
                        <h3>Home</h3>
                        <img src="./assets/logo.png" />
                      </div>
                      <UserInfo location={this.props.location} displayName={displayName} userId={userId} goTo={this.goTo}/>
                      <OverlayTrigger overlay={tooltip}>
                        <div onClick = {() => this.goTo(displayName, "report")} className='sidebar-container speedometer-container'>{' '}
                          <h3 id="stance-title">Stance</h3>
                          <HealthSpeedometer 
                            height={100}
                            width={150}
                            value = {userStance}
                            startColor="blue"
                            endColor="red"
                            min={-1}
                            max={1}
                            sidebar={true}
                          />
                        </div>
                      </OverlayTrigger>
                      <div onClick={() => this.goTo(displayName, "about")} className='sidebar-container'>
                        <h3 id="about-title">About</h3>
                        <img src="./assets/bargraph.png" />
                      </div>
                      <h3 id="logout-button"><a href='/logout'>Logout</a></h3>
                    </div>
                  );
                }}
              </Query>
            );
          }
          )}
        </Query>
      </div>
    )
  }
}

export default withRouter(Sidebar);