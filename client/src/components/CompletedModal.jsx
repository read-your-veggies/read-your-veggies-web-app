import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { withRouter } from "react-router-dom";


class CompletedModal extends React.Component {

  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.props.handleClose('completed')}>
        <Modal.Header>
          <Modal.Title>Thanks for reading "{this.props.article.title}".</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <p className="congrats">
              Great job!  You earned this many veggies: <br/><br/> 
            </p>
            {this.props.veggies}
            <p className="source-info"> 
            <a href={this.props.article.url} target="_blank">
              This article was originally published by {this.props.article.source}.
            </a>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button onClick={ (e) => {
              e.preventDefault();
              this.props.setCurrentArticleId(null);
              this.props.handleClose('completed')
            }}>Close</Button>
            <Button onClick={(e) => {
              e.preventDefault();
              // Redirect user to health report
              this.props.history.push('/health');
            }}>View your health report</Button>
          </div>
        </Modal.Footer>
        
      </Modal>
    )
  }
}

export default withRouter(CompletedModal);