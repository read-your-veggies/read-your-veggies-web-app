import React from 'react';
import Popover from 'react-bootstrap/lib/Popover';
import Panel from 'react-bootstrap/lib/Panel';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Voter from './Voter.jsx';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Badge from 'react-bootstrap/lib/Badge';
import { DELETE_ARTICLE } from '../apollo/resolvers';
import { GET_ARTICLES_FROM_SERVER, GET_ONE_FULL_ARTICLE } from '../apollo/serverQueries';
import { Query, ApolloConsumer } from "react-apollo";

class ArticleModal extends React.Component {
  constructor(props) {
    super(props);
    // console.log('article modal props', props);

    this.completeArticle = this.completeArticle.bind(this);
  }

  completeArticle() {
    console.log("completed article");
    this.props.handleClose('article');
    this.props.handleShow('voter');
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (
      <Modal show={this.props.show} onHide={() => this.props.handleClose('voter')}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.article.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>{this.props.article.description}</h4> */}
          <div className="modal-body-left">
            <img className="article-image" src={this.props.article.image} />
            <Voter articleId={this.props.article._id}/>
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
          <p>
            <OverlayTrigger overlay={popover}>
              <a href="#popover">Reveal Source</a>
            </OverlayTrigger>{' '}
          </p>
          <p>
            <OverlayTrigger overlay={tooltip}>
              <a href="#tooltip">Why this article?</a>
            </OverlayTrigger>{' '}
          </p>
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