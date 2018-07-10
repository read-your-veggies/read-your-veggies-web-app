import React from 'react';
import { withRouter } from "react-router-dom";


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.goToDashboard= this.goToDashboard.bind(this);
  }


  goToDashboard(displayName) {
    if (displayName !== 'Login') {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const displayName = this.props.getUserInfo.data.userInfo.displayName;
    
    return (
      <div className="header" onClick={() => this.goToDashboard(displayName)}>
        <div className="header-text" >
          <h1 id="read-your-veggies">READ YOUR VEGGIES</h1>
          <h4>Your news app for a balanced media diet</h4>      
        </div>
      </div>
    )
  }
}

export default withRouter(Header);