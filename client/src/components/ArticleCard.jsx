import React from 'react';
import Popover from 'react-bootstrap/lib/Popover';
import Panel from 'react-bootstrap/lib/Panel';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Voter from './Voter.jsx';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Badge from 'react-bootstrap/lib/Badge';

import ArticleModal from './ArticleModal.jsx';
import CompletedModal from './CompletedModal.jsx';

import { DELETE_ARTICLE } from '../apollo/resolvers';
import { GET_ARTICLES_FROM_SERVER, GET_ONE_FULL_ARTICLE } from '../apollo/serverQueries';
import { Mutation, ApolloConsumer } from "react-apollo";

const updateCache = (cache, { data: { deleteArticle} }) => {
  console.log('cache', cache, deleteArticle);
  const { articles } = cache.readQuery({ query: GET_ARTICLES_FROM_SERVER });

  cache.writeQuery({
    query: GET_ARTICLES_FROM_SERVER,
    data: {
      articles: articles.filter(article => article._id !== deleteArticle._id)
    }
  });
};

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showArticle: false,
      showVoter: false,
      showCompleted: false,
      fullArticle: {},
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(modalType) {
    if (modalType === 'article') {
      this.setState({ showArticle: false });
    } else if (modalType === 'voter'){
      this.setState({ showVoter: false })
    } else if (modalType === 'completed') {
      this.setState({ showCompleted: false })
    }
  }

  handleShow(modalType) {
    if (modalType === 'article') {
      this.setState({ showArticle: true });
    } else if (modalType === 'voter') {
      this.setState({ showVoter: true})
    } else if (modalType === 'completed') {
      this.setState({ showCompleted: true })
    }
  }

  render() {
  
    return (
      <Mutation mutation={DELETE_ARTICLE} update={updateCache}>
        { (deleteArticle) => {
          return (
            <div className="article">
              <Panel bsStyle="success">
                <Panel.Heading className='title'>
                  <button className='delete-article-button' onClick={() => deleteArticle({ variables: { _id: this.props.article._id } })}> X </button>
                  <Panel.Title>{this.props.article.title}</Panel.Title>
                  <Badge pullRight bsStyle="danger">{this.props.article.articleStance}</Badge>
                </Panel.Heading>
                <Panel.Body>
                  <h3 className="article-card-title">{this.props.article.title}</h3>
                  <img className="article-thumbnail" src={this.props.article.image} />
                  {/* <p>{this.props.article.description}</p> */}
                </Panel.Body>

                <ApolloConsumer>
                  { client => (
                    <Button 
                      className="eat-me" 
                      bsStyle="info" 
                      bsSize="large" 
                      onClick={async () => {
                        const {data} = await client.query({
                          query: GET_ONE_FULL_ARTICLE,
                          variables: {_id: this.props.article._id}
                        })
                        this.setState({
                          fullArticle: data.article,
                          showArticle: true,
                        })
                      }}
                    >
                    Eat me
                  </Button>
                  )}
                </ApolloConsumer>
              </Panel>

              <ArticleModal 
                show={this.state.showArticle} 
                handleClose = {this.handleClose}
                handleShow = {this.handleShow}
                article = {this.state.fullArticle}
              />
              <Voter
                show={this.state.showVoter}
                handleClose = {this.handleClose}
                handleShow = {this.handleShow}
                articleId={this.props._id}
              />
              <CompletedModal
                show={this.state.showCompleted}
                handleClose={this.handleClose}
                article = {this.state.fullArticle}
              />
            </div>
          )}}
      </Mutation>
    );
  }
}

export default ArticleCard;