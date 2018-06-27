import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import { UPDATE_ARTICLE_VOTES } from '../apollo/resolvers';
import { Mutation } from "react-apollo";
import Modal from 'react-bootstrap/lib/Modal';
import { withRouter } from "react-router-dom";



class CompletedModal extends React.Component {
  constructor(props) {
    super(props);
    // console.log('completed modal props', props);
   

    this.state = {
      veggies: 8,
    }

    // func bindings here
  }




  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.props.handleClose('completed')}>
      <Modal.Body>
        Testing son
        <Button onClick={() => {
          this.props.handleClose('completed');
          this.props.history.push('/health');
        }}>See your health report!</Button>
      </Modal.Body>
      </Modal>
    )
  }
  
}

export default withRouter(CompletedModal);