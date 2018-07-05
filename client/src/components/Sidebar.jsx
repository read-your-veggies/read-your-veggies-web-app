import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_USER_STANCE_INFO } from '../apollo/serverQueries.js';
import {GET_USER_INFO} from '../apollo/localQueries.js';
import HealthSpeedometer from './HealthSpeedometer.jsx';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';



class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divHeight: ''
    };
  }

  componentDidMount() {
    //subtract 147 px (size of header);
    this.setState({divHeight: window.innerHeight - 147 + 'px'});
  }

  render() {
    var tooltip = <Tooltip id="modal-tooltip">Learn More</Tooltip>;

    return (
      <div id='dash-sidebar' style={{height: this.state.divHeight}}>
        <Query query={GET_USER_INFO}>
          {(({data}) => {
            return (
              <Query query={GET_USER_STANCE_INFO} variables={{ _id: data.userInfo.userId }}>
                {({ loading, error, data }) => {
                  if (loading) return "Loading...";
                  if (error) return `Error! ${error.message}`;
                  var userStance = JSON.parse(data.user.user_stance);
                  return (
                    <div>
                      <a href='#'>{' '}
                        <OverlayTrigger overlay={tooltip}>
                          <div id='sidebar-pol-stance'>
                            <h3 id='stance-title'>Your Read-Your-Veggies Stance:</h3>
                            <HealthSpeedometer 
                              height={100}
                              width={150}
                              value = {userStance}
                              startColor="blue"
                              endColor="red"
                              min={-1}
                              max={1}
                            />
                          </div>
                        </OverlayTrigger>
                      {' '}</a>
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

export default Sidebar;