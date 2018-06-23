import React, { Component } from 'react';
import { Route, withRouter, Switch } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1><a href = '/auth/facebook'>Login with FB</a></h1>
    )
  }
}

export default withRouter(Login);