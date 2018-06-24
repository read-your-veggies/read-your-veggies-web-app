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
import { GET_ARTICLES_FROM_SERVER } from '../apollo/serverQueries';
import { Mutation } from "react-apollo";

const updateCache = (cache, { data: { deleteArticle} }) => {
  console.log(cache, deleteArticle);
  const { articles } = cache.readQuery({ query: GET_ARTICLES_FROM_SERVER });

  cache.writeQuery({
    query: GET_ARTICLES_FROM_SERVER,
    data: {
      articles: articles.filter(article => article._id !== deleteArticle._id)
    }
  });
};

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false
    };
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
      <Mutation mutation={DELETE_ARTICLE} update={updateCache}>
        { (deleteArticle) => {
          return (
            <div className="article">
              <Panel bsStyle="success" onClick={() => deleteArticle({ variables: { _id: this.props.article._id } })}>
                  <Panel.Heading className='title'>
                    <Panel.Title>{this.props.article.title}</Panel.Title>
                    <Badge pullRight bsStyle="danger">{this.props.article.articleStance}</Badge>
                  </Panel.Heading>
                  <Panel.Body className='subtitle'>{this.props.article.description}</Panel.Body>

                  <Button className="eat-me" bsStyle="info" bsSize="large" onClick={this.handleShow}>
                    Eat me
                  </Button>
              </Panel>

              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{this.props.article.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4>{this.props.article.description}</h4>
                  <p>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </p>

                  <h4>Popover in a modal</h4>
                  <p>
                    there is a{' '}
                    <OverlayTrigger overlay={popover}>
                      <a href="#popover">popover</a>
                    </OverlayTrigger>{' '}
                    here
                  </p>

                  <h4>Tooltips in a modal</h4>
                  <p>
                    there is a{' '}
                    <OverlayTrigger overlay={tooltip}>
                      <a href="#tooltip">tooltip</a>
                    </OverlayTrigger>{' '}
                    here
                  </p>

                  <hr />

                  <h4>Fulltext</h4>
                  <p>{this.props.article.fullText}</p>
                </Modal.Body>
                <Voter articleId={this.props.article._id}/>
                <Modal.Footer>
                  <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}}
       </Mutation>
    );
  }
}

export default Article;