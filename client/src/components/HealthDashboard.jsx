import React from 'react';
import { withRouter } from "react-router-dom";
import { Mutation, Query } from "react-apollo";
import { OFF_BOARD_USER } from '../apollo/resolvers.js';
import { GET_USER_FROM_DB } from '../apollo/serverQueries.js';
import Button from 'react-bootstrap/lib/Button';
import HealthSpeedometer from './HealthSpeedometer.jsx';
import CompletedArticles from './CompletedArticles.jsx';

class HealthDashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userId: null,
    }

  }

  componentDidMount() {
    this.setState({
      userId: this.props.getUserInfo.data.userInfo.userId,
    })
  }

  render() {
    return (
      <div>
        <Mutation mutation={OFF_BOARD_USER} >
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
        </Mutation>
        <Query
          query={GET_USER_FROM_DB}
          variables={{ _id: this.state.userId }}
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <div className="health-dashboard-speedometer">
                <HealthSpeedometer 
                  onboardString={data.user.onboard_information}
                  value = {data.user.health}
                  startColor="white"
                  endColor="green"
                  min={0}
                  max={50}
                />
              </div>
            );
          }}
        </Query>
        <CompletedArticles />
      </div>
    );
  }

}

export default withRouter(HealthDashboard);