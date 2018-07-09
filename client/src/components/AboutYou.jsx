import React from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_USER_STANCE_INFO } from '../apollo/serverQueries.js';
import HealthSpeedometer from './HealthSpeedometer.jsx';
import Sidebar from './Sidebar.jsx';
import Loading from './Loading.jsx';
import UserStats from './UserStats.jsx';


class AboutYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divHeight: '',
    }
  }

  componentDidMount() {
    this.setState({divHeight: window.innerHeight - 147 + 'px'});
  }

  render() {
    return (
      <div id='about-you-dash'>
        <Sidebar location={this.props.location} getUserInfo={this.props.getUserInfo}/>
        <div id='about-you-inner-content' style={{height: this.state.divHeight}}>
        <h3>Your user stance is calculated from the following categories:</h3>
            <div id='about-you-user-stances-wrapper'>
              <UserStats userId ={this.props.getUserInfo.data.userInfo.userId} />
            </div>
            <Query query={GET_USER_STANCE_INFO} variables={{ _id: this.props.getUserInfo.data.userInfo.userId } } fetchPolicy='network-only'>
              {({ loading, error, data, }) => {
                if (loading) return <Loading />;
                if (error) return `Error! ${error.message}`;
                var userStance = JSON.parse(data.user.user_stance);
                return (
                  <div className='aggregate-stance'>
                    <h2>Your Read Your Veggies Stance:</h2>
                    <HealthSpeedometer
                          className='data' 
                          height={200}
                          width={300}
                          value = {userStance}
                          startColor="blue"
                          endColor="red"
                          min={-1}
                          max={1}
                        />
                  </div>
                );
              }}
            </Query>
          </div>
        </div>
    );
  }

}

export default withRouter(AboutYou);