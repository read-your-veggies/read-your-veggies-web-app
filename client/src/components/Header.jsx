import UserInfo from './UserInfo.jsx';
import React from 'react';
import { withRouter } from "react-router-dom";


class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log('header', props);

    this.goToDashboard= this.goToDashboard.bind(this);
    this.goToDashboard= this.goToAboutUs.bind(this);
  }


  goToDashboard(displayName) {
    if (displayName !== 'Login') {
      this.props.history.push('/dashboard');
    }
  }

  goToAboutUs(displayName) {
    if (displayName !== 'John Doe') {
      this.props.history.push('/aboutus');
    }
  }

  render() {

    var displayName = this.props.getUserInfo.data.userInfo.displayName;
    var userId = this.props.getUserInfo.data.userInfo.userId;

    return (
      
      <div className="header">
        <div onClick={() => this.goToAboutUs(displayName)} id='logo-container'>
          <img id="logo" src="./assets/logo.png" />
        </div>
        <div className="header-text">
          <h1 onClick={() => this.goToDashboard(displayName)} id="read-your-veggies">Read-Your-Veggies.com</h1>
          <h2>Your news app for a balanced media diet</h2>
        </div> 
        <UserInfo location={location} displayName={displayName} userId={userId} />
      </div>
    )
  }
}

export default withRouter(Header);