import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import ArticleCarousel from './ArticleCarousel.jsx';
import { GET_USER_ONBOARD_INFO_AND_STANCE } from '../apollo/serverQueries.js';
import {UPDATE_USER_BROWSING_HISTORY} from '../apollo/resolvers.js'
import Sidebar from './Sidebar.jsx';
import Loading from './Loading.jsx';
import WelcomeModal from './WelcomeModal.jsx';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      onboardInformation: null,
      userData: null,
      browsingHistory: [],
      divHeight: '',
    }
  }

  componentDidMount() {
    const id = this.props.getUserInfo.data.userInfo.userId;
    if (id !== '1234567890') {
      let userBrowsingHistory = [];
      try {
        userBrowsingHistory = localStorage.getItem('readYourVeggies').split(',');
      }
      catch(error) {
        console.warn('No browsing history in local storage', error);
      }
      this.setState({
        userId: id,
        browsingHistory: userBrowsingHistory,
        //subtract 147 px (size of header);
        divHeight: window.innerHeight - 100 + 'px',
      }, () => {
        localStorage.setItem('readYourVeggies', '');
      });
    }
  }

  //run request to see if user is onboarded -- if not do ternary to render onboardmodal 
  render() {
    return(
      <div className="dashboard" style={{height: this.state.divHeight}}>
        <Sidebar location={this.props.location} getUserInfo={this.props.getUserInfo}/>
        {this.state.onboardInformation === null
          ?
          <div>
            <Query query={GET_USER_ONBOARD_INFO_AND_STANCE} variables={{ _id: this.state.userId }}>
              {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return `Error! ${error.message}`;
                this.setState({
                  onboardInformation: data.user.onboard_information,
                  userData: data.user,
                });
                return (
                  null
                );
              }}
            </Query>
            {/* UPDATE USER BROWSING HISTORY FROM CHROME EXTENSION */}
            <Mutation mutation={UPDATE_USER_BROWSING_HISTORY} >
            {(updateUserBrowsingHistory) => {
              updateUserBrowsingHistory({ variables: { _id: this.state.userId, browsing_history: this.state.browsingHistory } });
              return (
                null
                )}}
            </Mutation>
          </div>
          :
          null
        }
        {this.state.onboardInformation === 'NEED_ON_BOARDING' ? <WelcomeModal userId={this.state.userId} /> : null}
        {this.state.onboardInformation === 'NEED_ON_BOARDING' || this.state.onboardInformation === null
          ?
          null
          :
          <div className="dashboard-container" style={{height: this.state.divHeight}}>
            <ArticleCarousel userData={this.state.userData}  />
          </div>
        }
      </div>
    );
  }
}

export default withRouter(Dashboard);