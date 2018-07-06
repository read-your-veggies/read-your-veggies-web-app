import React from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_USER_STANCE_INFO } from '../apollo/serverQueries.js';
import {GET_USER_INFO} from '../apollo/localQueries.js';
import HealthSpeedometer from './HealthSpeedometer.jsx';
import Sidebar from './Sidebar.jsx';
import {PieChart} from 'react-easy-chart'; 
import Loading from './Loading.jsx';


class AboutYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divHeight: '',
    }

    this.getColor = this.getColor.bind(this);
  }

  componentDidMount() {
    this.setState({divHeight: window.innerHeight - 147 + 'px'});
  }

  getColor(value) {
    if (value === 0) {
      return 'hsl(230, 100%, 100%)';
    } else if (value < 0) {
      return `hsl(230, 100%, ${value * 100 + 100}%`;
    } else if (value > 0) {
      return `hsl(350, 100%, ${100 - value * 50}%`;
    }
  }

  render() {
    return (
      <div id='about-you-dash'>
        <Sidebar />
        <div id='about-you-inner-content' style={{height: this.state.divHeight}}>
            <Query query={GET_USER_STANCE_INFO} variables={{ _id: this.props.getUserInfo.data.userInfo.userId } } fetchPolicy='network-only'>
              {({ loading, error, data, }) => {
                if (loading) return <Loading />;
                if (error) return `Error! ${error.message}`;
                var userStance = JSON.parse(data.user.user_stance);
                var onboardStance = JSON.parse(data.user.onboard_stance);
                var locPolRatio = JSON.parse(data.user.locPolRatio);
                var homePolRatio = JSON.parse(data.user.homePolRatio);
                var readingStance = JSON.parse(data.user.reading_stance[0]);
                var browsingStance = JSON.parse(data.user.browsing_history_stance[0]);
                
                return (
                  <div>
                  <PieChart
                    labels
                    data={[
                      { key: 'Self-report', value: 5, color: this.getColor(onboardStance)},
                      { key: 'Current city', value: 1, color: this.getColor(locPolRatio) },
                      { key: 'Hometown', value: 1, color: this.getColor(homePolRatio) },
                      { key: 'Veggies reading', value: 1, color: this.getColor(readingStance) },
                      { key: 'Browsing', value: 2, color: this.getColor(browsingStance) }
                    ]}
                  />
                  <h1>Your Overall Political Stance:</h1>
                  <HealthSpeedometer 
                    height={100}
                    width={150}
                    value = {userStance}
                    startColor="blue"
                    endColor="red"
                    min={-1}
                    max={1}
                  />
                  <h1>Your Self Reported Political Stance:</h1>
                  <p>{onboardStance}</p>
                  <HealthSpeedometer 
                    height={100}
                    width={150}
                    value = {onboardStance}
                    startColor="blue"
                    endColor="red"
                    min={-1}
                    max={1}
                  />
                  <h1>The Political Stance of Your Current City ({data.user.location}):</h1>
                  <HealthSpeedometer 
                    height={100}
                    width={150}
                    value = {locPolRatio}
                    startColor="blue"
                    endColor="red"
                    min={-1}
                    max={1}
                  />
                  <h1>The Political Stance of Your Hometown ({data.user.hometown}):</h1>
                  <HealthSpeedometer 
                    height={100}
                    width={150}
                    value = {homePolRatio}
                    startColor="blue"
                    endColor="red"
                    min={-1}
                    max={1}
                  />
                  <h1>The Political Stance of Your Reading Habits:</h1>
                  <HealthSpeedometer 
                    height={100}
                    width={150}
                    value = {readingStance}
                    startColor="blue"
                    endColor="red"
                    min={-1}
                    max={1}
                  />
                  </div>
                );
              }}
            </Query>
          </div>
        </div>
    );
  }

}

export default withRouter(AboutYou);