import UserInfo from './UserInfo.jsx';
import React from 'react';
import { withRouter } from "react-router-dom";


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <div id='logo-container'>
          <img id="logo" src="./assets/logo.png" />
        </div>
        <div className="header-text">
          <h1 id="read-your-veggies">Read-Your-Veggies.com</h1>
          <h2>A news app for a balanced media diet</h2>
        </div>
        <UserInfo location={location} />
      </div>
    )
  }
}

export default withRouter(Header);