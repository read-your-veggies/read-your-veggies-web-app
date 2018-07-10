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
  constructor(props) {
    super(props);
    this.state = {
      divHeight: ''
    };
    this.goTo= this.goTo.bind(this);
  }

  componentDidMount() {
    //subtract 147 px (size of header);
    this.setState({divHeight: window.innerHeight - 147 + 'px'});
  }

  goTo(displayName, link) {
    if (displayName !== 'Login') {
      this.props.history.push(`/${link}`);
    }
  }

  render() {
    const tooltip = <Tooltip id="modal-tooltip">See Your Report</Tooltip>;
    const userId = this.props.getUserInfo.data.userInfo.userId;
    const displayName = this.props.getUserInfo.data.userInfo.displayName;

    return (
      <div id='dash-sidebar' >
        <Query query={GET_USER_INFO}>
          {(({data}) => {
            return (
              <Query fetchPolicy='network-only' query={GET_USER_STANCE_INFO} variables={{ _id: data.userInfo.userId }}>
                {({ loading, error, data }) => {
                  if (loading) return null;
                  if (error) return `Error! ${error.message}`;
                  const userStance = JSON.parse(data.user.user_stance);
                  return (
                    <div id='dash-sidebar-inner'>
                      {/* <div onClick={() => this.goTo(displayName, "dashboard")} className='sidebar-container'>
                        <h3>Home:</h3>
                        <img src="./assets/logo.png" />
                      </div> */}
                      <UserInfo location={this.props.location} displayName={displayName} userId={userId} />
                      <a onClick = {() => this.goTo(displayName, "report")}>{' '}
                        <OverlayTrigger overlay={tooltip}>
                          <div id='sidebar-pol-stance'>
                            <h3 id='stance-title'>Stance</h3>
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
                      {' '}</a>
                      <div className='sidebar-container' onClick={() => this.goTo(displayName, "about")}>
                        <h3>About</h3>
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