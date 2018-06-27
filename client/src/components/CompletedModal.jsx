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
    let author;
    this.props.article.author ? author = this.props.article.author[0] : author = '';

    return (
      <Modal show={this.props.show} onHide={() => this.props.handleClose('completed')}>
        <Modal.Header>
          <Modal.Title>Thanks for reading "{this.props.article.title}"!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="container">
            <p class="text-center">
              Great job!  You earned {this.state.veggies} veggies!
            </p>
            <p class="text-center">
              <img id="trophy" width="100"  src="./assets/carrot.jpg" />
            </p>
            <p class="text-center">
              This article was written by {author} and originally published by {this.props.article.source}.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>

          <div>
            <Button onClick={ (e) => {
              e.preventDefault();
              this.props.handleClose('completed')
            }}>Close</Button>
            <Button onClick={(e) => {
              e.preventDefault();
              this.props.history.push('/health');
            }}>See your health report!</Button>
          </div>
        </Modal.Footer>
        
      </Modal>
    )
  }
  
}

export default withRouter(CompletedModal);