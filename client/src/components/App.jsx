import React, { Component } from 'react';
import { Route, withRouter, Switch } from "react-router-dom";
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';
import axios from 'axios';
import Header from './Header.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('/checkAuthHeaders').then((res) => {
      if (res.headers.user !== undefined) {
        this.props.history.push('/dashboard');
      } else {
        this.props.history.push('/login');
        //TODO - Add user info to local store here.
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