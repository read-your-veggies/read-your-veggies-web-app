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
import { Query, Mutation } from "react-apollo";

class ArticleModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    const FullArticle = ({ _id }) => (
      <Query query={GET_ONE_FULL_ARTICLE}  variables={{ _id }}>
        { ({ loading, error, data}) => {
          if (loading) return null;
          if (error) return 'Error!';
          return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{this.props.article.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* <h4>{this.props.article.description}</h4> */}

                  <div className="article-body">
                    <img className="article-image" src={data.article.image} />
                    <p className="article-full-text">{data.article.fullText}</p>
                    <Voter articleId={this.props.article._id}/>
                  </div>

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
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
              </Modal>
          );
        }}
      </Query>
    )


    return (
          <div>
            <FullArticle _id={this.props.article._id} />
          </div>
    );
  }
}

export default ArticleModal;