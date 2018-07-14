import React from 'react';
import { withRouter } from "react-router-dom";


const Header = (props) => {

  const goToDashboard = (displayName) => {
    if (displayName !== 'Login') {
      props.history.push('/dashboard');
    }
  }

  const displayName = props.getUserInfo.data.userInfo.displayName;
    
  return (
    <div className="header" onClick={() => goToDashboard(displayName)}>
      <div className="header-text" >
        <h1 id="read-your-veggies">READ YOUR VEGGIES</h1>
        <h4>Your news app for a balanced media diet</h4>      
      </div>
    </div>
  )

}

export default withRouter(Header);