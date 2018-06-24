import UserInfo from './UserInfo.jsx';
import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <div id='logo-container'>
        <img id="logo" src="./assets/logo.png" />
      </div>
      <div className="header-text">
        <h1 id="read-your-veggies">Read-Your-Veggies.com</h1>
        <h2>A news app for a balanced media diet</h2>
      </div>
      <UserInfo />
    </div>
  )
}

export default Header;