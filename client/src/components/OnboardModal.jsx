import React from 'react';
import Popover from 'react-bootstrap/lib/Popover';
import Panel from 'react-bootstrap/lib/Panel';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Voter from './Voter.jsx';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Badge from 'react-bootstrap/lib/Badge';

class OnboardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-left">
            <img className="article-image" src='../../dist/assets/logo.png' />
            <p>aldfkjasdfjkasd</p>
          </div>
          <div className="modal-body-right">
            <Panel>
              <Panel.Body className="article-full-text">lksjdfaldfjksafjksd</Panel.Body>
            </Panel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <p>
            <OverlayTrigger overlay={popover}>
              <a href="#popover">asdfsa</a>
            </OverlayTrigger>{' '}
          </p>
          <p>
            <OverlayTrigger overlay={tooltip}>
              <a href="#tooltip">asdfasd</a>
            </OverlayTrigger>{' '}
          </p>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default OnboardModal;