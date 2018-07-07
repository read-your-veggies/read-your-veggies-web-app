import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import 'react-rangeslider/lib/index.css';
import { withRouter } from "react-router-dom";
import UserStats from './UserStats.jsx';


class GettingStartedModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }
  
  handleClose() {
    this.setState({
      show: false,
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
            <Modal.Title>How it Works:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Panel className="welcome-modal-body">
                <Panel.Body>
                  <h3>Your <strong>veggies stance</strong> is calculated from the following categories:</h3>
                  <UserStats userId ={this.props.userId} />
                </Panel.Body>
              </Panel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              id='submit-onboard'
              onClick={(e) => {
                e.preventDefault();
                this.handleClose();
                setTimeout(() => {
                  this.props.history.push('/dashboard');
                }, 500)
              }}>
              Got It!
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(GettingStartedModal);