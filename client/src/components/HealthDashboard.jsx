import React from 'react';
import { withRouter } from "react-router-dom";
import { Mutation, Query } from "react-apollo";
import { OFF_BOARD_USER } from '../apollo/resolvers.js';
import { GET_USER_HEALTH } from '../apollo/serverQueries.js';
import Button from 'react-bootstrap/lib/Button';
import HealthSpeedometer from './HealthSpeedometer.jsx';
import CompletedArticles from './CompletedArticles.jsx';
import Sidebar from './Sidebar.jsx';

class HealthDashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userId: null,
      divHeight: ''
    }
  }

  componentDidMount() {
    this.setState({
      userId: this.props.getUserInfo.data.userInfo.userId,
      divHeight: window.innerHeight - 147 + 'px'
    })
  }

  render() {
    return (
      <div id='health-dashboard' style={{height: this.state.divHeight}}>
        <Sidebar />
          <div id='health-dashboard-inner-content'>
            <h2>My Recent Veggies</h2>
        {/* <Mutation mutation={OFF_BOARD_USER} >
          {(offBoardUser) => {
          return (
            <Button
              id='submit-onboard'
              onClick={(e) => {
                e.preventDefault();
                offBoardUser({ variables: { _id: this.state.userId } });
                setTimeout(() => {
                  this.props.history.push('/dashboard');
                }, 200)
              }}>Reconfigure Health Defaults</Button>
            )}}
        </Mutation> */}
        {/* <Query
          query={GET_USER_HEALTH}
          variables={{ _id: this.state.userId }}
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <div className="health-dashboard-speedometer">
                <HealthSpeedometer 
                  value = {data.user.health}
                  startColor="white"
                  endColor="green"
                  min={0}
                  max={50}
                />
              </div>
            );
          }}
        </Query> */}
        <CompletedArticles />
        </div>
      </div>
    );
  }
}

export default withRouter(HealthDashboard);