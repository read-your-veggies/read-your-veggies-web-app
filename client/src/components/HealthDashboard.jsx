import React from 'react';
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import { OFF_BOARD_USER } from '../apollo/resolvers.js';
import Button from 'react-bootstrap/lib/Button';
import HealthSpeedometer from './HealthSpeedometer.jsx';

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
      <HealthSpeedometer />
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
          </div>
    );
  }

}

export default withRouter(HealthDashboard);