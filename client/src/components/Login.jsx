import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login-page">
        <h2><a href = '/auth/facebook'>Login with Facebook</a></h2>
      </div>
    )
  }
}

export default withRouter(Login);