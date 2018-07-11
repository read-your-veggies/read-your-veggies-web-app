import React, { Component } from 'react';
import { Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
import Header from './Header.jsx';
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';
import AboutUs from './AboutUs.jsx';
import HealthDashboard from './HealthDashboard.jsx';
import {GET_USER_INFO} from '../apollo/localQueries.js';
import { Query } from "react-apollo";
import AboutYou from './AboutYou.jsx';


class App extends Component {
  state = {
    guestLoggedIn: false,
  }
  
  componentDidMount() {
    // If guestLoggedIn: Set the auth headers to match the guest profile
    // OR can we just use the updateUserInfo function below?

    axios.get('/checkAuthHeaders').then((res) => {
      if (this.state.guestLoggedIn) {
        this.props.history.push('/dashboard');
        let user = {
          name: 'Guest',
          _id: '5b4520fc863031826ary52fgg',
          health: 0,
          user_stance: 0.234613425,
          recently_read: [],
          locPolRatio: -.334523,
          homePolRatio: .1243544,
          onboard_stance: -.23546534645,
          onboard_information: {

          },
          reading_stance: [

          ],
          browsing_history: [],
          browsing_history_stance: [],
          facebookId: '432346456',
          name: "Guesty McGuestFace",
          emails: 'notAnEmail@whatwho.xyz',
          location: 'Hicksville, New York',
          hometown: 'Butte, Montana',
          

        };

        this.props.updateUserInfo({
          variables: {
            theDisplayName: user.name,
            theProvider: 'GuestLogin',
            theUserId: user._id,
          }
        })
      } else if (res.headers.user !== undefined) {
        // Redirect user to /dashboard with react router.
        this.props.history.push('/dashboard');
        const user = (JSON.parse(res.headers.user));

        this.props.updateUserInfo({
          variables: {
            theDisplayName: user.name,
            theProvider: 'Facebook',
            theUserId: user._id,
          }
        })
      } else {
        this.props.history.push('/login');
      }
    });
  }

  loginGuest = () => {
    this.setState({
      guestLoggedIn: true,
    }, console.log(this.state))
  }



  render() {
    return (
      <div className="app-container">
        <Query query={GET_USER_INFO}>
          {(getUserInfo => 
            <Header location = {location} getUserInfo = {getUserInfo} />)}
        </Query>  
        <Switch>
          <Route path={"/about"}
            component={() => 
              <Query query={GET_USER_INFO}>
              {(getUserInfo => 
                <AboutUs location = {location} getUserInfo = {getUserInfo} />)}
              </Query>
            }
          />
          <Route path={"/report"}
            component={() => 
              <Query query={GET_USER_INFO}>
              {(getUserInfo => 
                <AboutYou location = {location} getUserInfo = {getUserInfo} />)}
              </Query>
            }
          />
          <Route path={"/dashboard"}
            component={() => 
              <Query query={GET_USER_INFO}>
              {(getUserInfo => 
                <Dashboard location = {location} getUserInfo = {getUserInfo} />)}
              </Query>
            }
          />

          <Route path={'/login'} 
            component={() => 
              <Login loginGuest={this.loginGuest} />
            } 
          />

          <Route path={"/health"}
            component={() => 
              <Query query={GET_USER_INFO}>
              {(getUserInfo => 
                <HealthDashboard  getUserInfo={getUserInfo} />)}
              </Query>
            }
          />
        </Switch>
      </div>
    )
  }
}

// withRouter makes this a Higher Order Component with additional props.  Such as history.push which we use to redirect.
// We use this in several other components.
export default withRouter(App);