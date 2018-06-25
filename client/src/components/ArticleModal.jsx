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
                  <pre className='article-full-text'>{data.article.fullText}</pre>
                </Modal.Body>
                <Voter articleId={this.props.article._id}/>
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