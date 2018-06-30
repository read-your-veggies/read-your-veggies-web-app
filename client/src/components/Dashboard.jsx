import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_TEAM_NAME_FROM_LOCAL_STATE } from '../apollo/localQueries';
import ArticleCarousel from './ArticleCarousel.jsx';
import OnboardModal from './OnboardModal.jsx';
import { GET_USER_FROM_DB } from '../apollo/serverQueries.js';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    console.log('dash props', props)

    this.state = {
      userId: null,
      onboardInformation: null,
      userData: null,
    }
  }

  componentDidMount() {
    var id = this.props.getUserInfo.data.userInfo.userId;
    if (id !== '1234567890') {
      this.setState({userId: id}, () => console.log(this.state));
    }
  }

  //run request to see if user is onboarded -- if not do ternary to render onboardmodal 
  render() {
    return(
      <div>
        {this.state.onboardInformation === null
          ?
          <Query query={GET_USER_FROM_DB} variables={{ _id: this.state.userId }}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              this.setState({
                onboardInformation: data.user.onboard_information,
                userData: data.user,
              }, () => console.log(this.state));
              return (
                null
              );
            }}
          </Query>
          :
          null
        }
        {this.state.onboardInformation === 'NEED_ON_BOARDING' ? <OnboardModal userId={this.state.userId} /> : null}
        {this.state.onboardInformation === 'NEED_ON_BOARDING' || this.state.onboardInformation === null
          ?
          null
          :
          <div>
            {/* <h1>Your Weekly Goal: {JSON.parse(this.state.onboardInformation).veggieSlider}</h1> */}
            <ArticleCarousel userData={this.state.userData}  />
          </div>
        }
        {/* <Query query={GET_TEAM_NAME_FROM_LOCAL_STATE}>
          {({ data, client }) => {
            return (
              <h1 onClick={() =>  {
                client.writeData({ data: { teamName: data.teamName + 1 } })
              }}
              >{data.teamName}</h1>
            );
          }}
        </Query> */}
      </div>
    );
  }
}

export default withRouter(Dashboard);