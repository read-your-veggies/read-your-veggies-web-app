import React, { Component } from 'react';
import { Route, withRouter, Switch } from "react-router-dom";
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';
import axios from 'axios';
import Header from './Header.jsx';
import { graphql, compose } from 'react-apollo';
import { GET_USER_INFO, UPDATE_USER_INFO } from '../apollo/localQueries.js';

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    axios.get('/checkAuthHeaders').then((res) => {
      if (res.headers.user !== undefined) {
        this.props.history.push('/dashboard');
        var user = (JSON.parse(res.headers.user));
        //TODO - Add user info to local store here.
        console.log(user);
        this.props.updateUserInfo({
          variables: {
            theDisplayName: user.name,
            theProvider: 'Facebook',
            theProviderId: user.facebookId
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
        <Header />
        <Switch>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/login' component={Login}/>
        </Switch>
      </div>
    )
  }
}

export default compose(
  graphql(UPDATE_USER_INFO, {name: 'updateUserInfo'}),
  graphql(GET_USER_INFO, {
    props: ({data: {userInfo}}) => ({
      userInfo
    })
  })
)(withRouter(App));