import React from 'react';
import { Query, Mutation } from "react-apollo";
import { GET_USER_STANCE_INFO } from '../apollo/serverQueries.js';
import HealthSpeedometer from './HealthSpeedometer.jsx';
import Loading from './Loading.jsx';
import { withRouter } from "react-router-dom";
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ChromeExtensionModal from './ChromeExtensionModal.jsx';
import { OFF_BOARD_USER } from '../apollo/resolvers.js';


class UserStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      showChromeExtensionModal: false,
    })
    this.handleChromeExtensionClick = this.handleChromeExtensionClick.bind(this);
  }

  handleChromeExtensionClick() {
    this.setState({
      showChromeExtensionModal: true,
    });
  }

  render() {
    var chromeTip = <Tooltip id="modal-tooltip">Get the Chrome Extension</Tooltip>;
    var readingTip = <Tooltip id="modal-tooltip">Read Some Veggies!</Tooltip>;
    return (
      <div>
      <Query query={GET_USER_STANCE_INFO} variables={{ _id: this.props.userId } } fetchPolicy='network-only'>
        {({ loading, error, data, }) => {
          if (loading) return <Loading />;
          if (error) return `Error! ${error.message}`;
          var userStance = JSON.parse(data.user.user_stance);
          var onboardStance = JSON.parse(data.user.onboard_stance);
          var locPolRatio = JSON.parse(data.user.locPolRatio);
          var homePolRatio = JSON.parse(data.user.homePolRatio);
          var readingStance = data.user.reading_stance;
          var browsingStance = data.user.browsing_history_stance;
          
          return (
            <div>
            <div className='user-stances'>
              <div className='partial-user-stance-container'>
                <h3 className='category'>Stance Subcategory</h3>
                <h3 className='data'>Your Stance</h3>
                <h3 className = 'multiplier'>Weight</h3>
              </div>
              <div className='partial-user-stance-container'>
                
                <Mutation mutation={OFF_BOARD_USER} >
                  {(offBoardUser) => {
                  return (
                    <h3 className='category'>
                      Your{' '}
                      <a
                        id='submit-onboard'
                        onClick={(e) => {
                          e.preventDefault();
                          offBoardUser({ variables: { _id: this.props.userId } });
                          setTimeout(() => {
                            this.props.history.push('/dashboard');
                          }, 200)
                        }}><strong>Self Reported</strong>
                      </a>
                      Political Stance:</h3>
                    )}}
                </Mutation>
                <HealthSpeedometer
                  className='data'
                  height={100}
                  width={150}
                  value = {onboardStance}
                  startColor="blue"
                  endColor="red"
                  min={-1}
                  max={1}
                />
                <h3 className = 'multiplier'>50%</h3>
              </div>
              <div className='partial-user-stance-container'>
                <h3 className='category'>The Political Stance of Your{' '}
          <OverlayTrigger overlay={chromeTip} placement='bottom'>
            <a onClick={this.handleChromeExtensionClick}><strong>browsing habits</strong></a>
          </OverlayTrigger>{' '}(based off of {browsingStance[1]} web pages):</h3>
                <HealthSpeedometer
                  className='data'
                  height={100}
                  width={150}
                  value = {Number(browsingStance[0])}
                  startColor="blue"
                  endColor="red"
                  min={-1}
                  max={1}
                />
                <h3 className = 'multiplier'>20%</h3>
              </div>
              <div className='partial-user-stance-container'>
                <h3 className='category'>The Political Stance of Your{' '}
          <OverlayTrigger overlay={readingTip} placement='bottom'>
            <a href='/'><strong>reading habits</strong></a>
          </OverlayTrigger>{' '} (based off of {readingStance[1]} articles):</h3>
                <HealthSpeedometer
                  className='data'
                  height={100}
                  width={150}
                  value = {Number(readingStance[0])}
                  startColor="blue"
                  endColor="red"
                  min={-1}
                  max={1}
                />
                <h3 className = 'multiplier'>10%</h3>
              </div>
              <div className='partial-user-stance-container'>
                <h3 className='category'>The Political Stance of Your Current City ({data.user.location}):</h3>
                <HealthSpeedometer 
                  className='data'
                  height={100}
                  width={150}
                  value = {locPolRatio}
                  startColor="blue"
                  endColor="red"
                  min={-1}
                  max={1}
                />
                <h3 className = 'multiplier'>10%</h3>
              </div>
              <div className='partial-user-stance-container'>
                <h3 className='category'>The Political Stance of Your Hometown ({data.user.hometown}):</h3>
                <HealthSpeedometer 
                  className='data'
                  height={100}
                  width={150}
                  value = {homePolRatio}
                  startColor="blue"
                  endColor="red"
                  min={-1}
                  max={1}
                />
                <h3 className = 'multiplier'>10%</h3>
              </div>
            </div>
          </div>
          );
        }}
      </Query>
      {this.state.showChromeExtensionModal ? <ChromeExtensionModal userId={this.props.userId} /> : null}
      </div>
    );
  }

}

export default withRouter(UserStats);