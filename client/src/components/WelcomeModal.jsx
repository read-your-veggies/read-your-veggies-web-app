import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import 'react-rangeslider/lib/index.css';
import { Query } from "react-apollo";
import { GET_USER_STANCE_INFO } from '../apollo/serverQueries.js';
import HealthSpeedometer from './HealthSpeedometer.jsx'
import OnboardModal from './OnboardModal.jsx';




class WelcomeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      showOnboardModal: false,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }
  
  handleClose() {
    this.setState({
      show: false,
      showOnboardModal: true,
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Modal id='onboard-modal' show={this.state.show} onHide={this.handleClose}>
          <Modal.Header >
            <Modal.Title>Welcome!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Panel className="welcome-modal-body">
                <Panel.Body>
                <p id='onboard-subtitle'>Thanks for Signing up to Read-Your-Veggies.  Here is some info about the politics that surround you:</p>
                <Query query={GET_USER_STANCE_INFO} variables={{ _id: this.props.userId }}>
                      {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        var locPolRatio = JSON.parse(data.user.locPolRatio);
                        var homePolRatio = JSON.parse(data.user.homePolRatio);
                        return (
                          <div>
                          <h3>Current City: <strong>{data.user.location}</strong></h3>
                          <HealthSpeedometer 
                            height={100}
                            width={150}
                            value = {locPolRatio}
                            startColor="blue"
                            endColor="red"
                            min={-1}
                            max={1}
                          />
                          <h3>Hometown: <strong>{data.user.hometown}</strong></h3>
                          <HealthSpeedometer 
                            height={100}
                            width={150}
                            value = {homePolRatio}
                            startColor="blue"
                            endColor="red"
                            min={-1}
                            max={1}
                          />
                          <h4>To help us find the most nutritious articles for you, let's answer a few questions:</h4>
                          </div>
                        );
                      }}
                    </Query>
                </Panel.Body>
              </Panel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              id='submit-onboard'
              onClick={(e) => {
                e.preventDefault();
                this.handleClose();
              }}>
              Get Started
            </Button>
          </Modal.Footer>
        </Modal>
        {this.state.showOnboardModal ? <OnboardModal userId={this.props.userId} /> : null}
      </div>
    );
  }
}

export default WelcomeModal;