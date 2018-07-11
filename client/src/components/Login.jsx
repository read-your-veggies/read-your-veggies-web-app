import React from 'react';
import { withRouter } from "react-router-dom";
//
const Login = () => (
  <div className="login-page">
    <h2><a href = '/auth/facebook'>Login with Facebook</a></h2>
    <h2><a href = ''>Login as Guest</a></h2>
  </div>
)

export default withRouter(Login);