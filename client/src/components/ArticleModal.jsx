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
      <Modal className="article-modal" show={this.props.show} onHide={() => this.props.handleClose('article')}>
        <Modal.Header className="article-header" closeButton>
          <Modal.Title className="article-title">{this.props.article.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Panel className="article-panel">
          {
            this.props.article.source !== "BBC News" ? 
            <img className="article-image" src={this.props.article.image} /> : null
          }
            <Panel.Body className="article-full-text">
              {this.props.article.fullText}
              <div className="complete-article-wrapper">
                <Button bsSize="large" bsStyle="success" onClick={(e) => {
                  e.preventDefault();
                  var msPerChar = (Date.now() - this.props.startTime) / this.props.article.fullText.length;
                  if (msPerChar < 1) {  
                    console.log('milliseconds per character', msPerChar);
                    alert("Whoa, slow down!  Please spend some more time reading the article to earn your veggies.");
                  } else {
                    this.completeArticle();
                  }
                }}>
                Complete Article
                </Button>
              </div>
            </Panel.Body>
          </Panel>
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