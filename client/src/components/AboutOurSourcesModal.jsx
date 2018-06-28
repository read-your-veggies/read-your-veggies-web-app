import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

class AboutOurSourcesModal extends React.Component {
  constructor(props) {
    super(props);   
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Title>Hello puppet</Modal.Title>
      </Modal>
    )
  }
}

export default AboutOurSourcesModal;