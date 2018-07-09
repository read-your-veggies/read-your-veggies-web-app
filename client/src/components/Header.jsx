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
    // var linkName;
    // if (displayName === 'Login') {
    //   linkName = 'Login';
    // } else {
    //   linkName = 'Logout';
    // }
    
    return (
      
      <div className="header">
      
        <div className="header-text" onClick={() => this.goToDashboard(displayName)}>
          {/* <img id="logo" src="./assets/logo.png" /> */}
          {/* <h1>R</h1><h3>ead</h3><h1>Y</h1><h3>our</h3><h1>V</h1><h3>eggies</h3> */}
          <h1 id="read-your-veggies">READ YOUR VEGGIES</h1>
          <h4>Your news app for a balanced media diet</h4>
        
          
        </div>
        
        {/* <div id="header-right">
          <h4>Your news app for a balanced media diet</h4>
          <h4><a href={displayName === 'Login' ? '/auth/facebook' : '/logout'}>{linkName}</a></h4>
        </div> */}
      </div>
    )
  }
}

export default withRouter(Header);