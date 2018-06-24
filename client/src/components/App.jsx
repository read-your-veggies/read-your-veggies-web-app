import React, { Component } from 'react';
import { Route, withRouter, Switch } from "react-router-dom";
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';
import axios from 'axios';
import Header from './Header.jsx';

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
        console.log(res.headers);
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

export default withRouter(App);