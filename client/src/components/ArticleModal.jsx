import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

class ArticleModal extends React.Component {
  constructor(props) {
    super(props);

    this.completeArticle = this.completeArticle.bind(this);
  }

  // When finished, close this modal, launch the voter modal.
  completeArticle() {
    console.log("completed article");
    this.props.handleClose('article');
    this.props.handleShow('voter');
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.props.handleClose('article')}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.article.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>{this.props.article.description}</h4> */}
          <div className="modal-body-left">
            <img className="article-image" src={this.props.article.image} />
          </div>
          <div className="modal-body-right">
            <Panel>
              <Panel.Body className="article-full-text">{this.props.article.fullText}</Panel.Body>
              <Button onClick={(e) => {
                e.preventDefault();
                this.completeArticle();
              }}
              >Complete article!</Button>
            </Panel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={
            (e) => {
              e.preventDefault();
              this.props.handleClose('article');
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ArticleModal;