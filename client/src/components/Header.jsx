import UserInfo from './UserInfo.jsx';
import React from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import {GET_USER_INFO} from '../apollo/localQueries.js';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.goToDashboard= this.goToDashboard.bind(this);
  }

  goToDashboard(displayName) {
    if (displayName !== 'John Doe') {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <Query query={GET_USER_INFO}>
            {({ data, client }) => {
              return (
                <div className="header">
                  <div onClick={() => this.goToDashboard(data.userInfo.displayName)} id='logo-container'>
                    <img id="logo" src="./assets/logo.png" />
                  </div>
                  <div className="header-text">
                    <h1 onClick={() => this.goToDashboard(data.userInfo.displayName)} id="read-your-veggies">Read-Your-Veggies.com</h1>
                    <h2>A news app for a balanced media diet</h2>
                  </div>
                  <UserInfo location={location} displayName={data.userInfo.displayName} />
                </div>
              )
            }}
          </Query>
    )
  }
}

export default withRouter(Header);