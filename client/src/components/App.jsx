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


class App extends Component {
  constructor(props) {
    super(props);
    console.log('App props', props);
  }

  componentDidMount() {
    axios.get('/checkAuthHeaders').then((res) => {
      if (res.headers.user !== undefined) {
        this.props.history.push('/dashboard');
        var user = (JSON.parse(res.headers.user));
        //TODO - Add user info to local store here.
        // console.log(user._id);
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
  render() {
    return (
      <div className="app-container">
        <Header location={location} />
        <Switch>
          <Route path={"/aboutus"}
            component={() => 
              <Query query={GET_USER_INFO}>
              {(getUserInfo => 
                <AboutUs location = {location} getUserInfo = {getUserInfo} />)}
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
          <Route path='/login' component={Login} />
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

export default withRouter(App);