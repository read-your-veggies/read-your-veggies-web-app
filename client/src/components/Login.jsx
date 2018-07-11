import React from 'react';
import { withRouter } from "react-router-dom";
//
const Login = (props) => (
  <div>
  <div className="login-page">
    <h2><a href = '/auth/facebook'>Login with Facebook</a></h2>
  </div>

  <div className="login-page">
    <h2><a onClick={props.loginGuest}>Login as Guest</a></h2>
  </div>
  </div>
)

export default withRouter(Login);