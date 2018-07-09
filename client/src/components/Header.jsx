import React from 'react';
import { withRouter } from "react-router-dom";


class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log('header', props);

    this.goToDashboard= this.goToDashboard.bind(this);
  }


  goToDashboard(displayName) {
    if (displayName !== 'Login') {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    var displayName = this.props.getUserInfo.data.userInfo.displayName;
    var linkName;
    if (displayName === 'Login') {
      linkName = 'Login';
    } else {
      linkName = 'Logout';
    }
    
    return (
      
      <div className="header">
        <div onClick={() => this.goToDashboard(displayName)} id='logo-container'>
          <img id="logo" src="./assets/logo.png" />
        </div>
        <div className="header-text">
          <h1 onClick={() => this.goToDashboard(displayName)} id="read-your-veggies">Read-Your-Veggies</h1>
          <h2>Your news app for a balanced media diet</h2>
        </div>
        <h2 id="profile-link">{' '}
          <a href={displayName === 'Login' ? '/auth/facebook' : '/logout'}>{linkName}</a>
        </h2>
      </div>
    )
  }
}

export default withRouter(Header);