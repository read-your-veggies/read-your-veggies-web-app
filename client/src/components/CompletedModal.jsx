import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { withRouter } from "react-router-dom";



class CompletedModal extends React.Component {
  constructor(props) {
    super(props);
    // console.log('completion props', props.veggies)

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
              Great job!  You earned this many veggies! <br/> {this.props.veggies}
            </p>
          
            <p class="text-center"> 
            <a href={this.props.article.url} target="_blank">
              This article was written by {author} and originally published by {this.props.article.source}.
            </a>
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