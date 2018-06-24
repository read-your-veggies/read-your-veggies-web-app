import React, { Component } from 'react';
import { Route, withRouter, Switch } from "react-router-dom";
import Dashboard from './Dashboard.jsx';
import Login from './Login.jsx';
import axios from 'axios';
import Header from './Header.jsx';
<<<<<<< HEAD
=======
import { graphql, compose } from 'react-apollo';
>>>>>>> dc8859b43cb153c3e227050c86f1c7edbde653cb

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
<<<<<<< HEAD
        console.log(res.headers);
=======
        console.log(user);
>>>>>>> dc8859b43cb153c3e227050c86f1c7edbde653cb
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