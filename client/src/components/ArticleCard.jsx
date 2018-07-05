import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Voter from './Voter.jsx';
import Badge from 'react-bootstrap/lib/Badge';
import ArticleModal from './ArticleModal.jsx';
import CompletedModal from './CompletedModal.jsx';
import { DELETE_ARTICLE } from '../apollo/resolvers';
import { GET_ARTICLES_FROM_SERVER, GET_ONE_FULL_ARTICLE } from '../apollo/serverQueries';
import { Query, Mutation, ApolloConsumer } from "react-apollo";
import { calculateNutritionalValue } from '../lib/calculateStance.js';
import { TagCloud } from "react-tagcloud";

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
      wordCloud: [],
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderCarrots = this.renderCarrots.bind(this);
  }

  // There are three modals launched from ArticleCard.  Their closing and opening is handled by these functions.
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

  renderCarrots () {
    var nutritionalValue = calculateNutritionalValue(this.props.userStance, this.props.article.articleStance )
    return (<h3 className="carrots">{'🥕'.repeat(nutritionalValue)}</h3>);

  }

  componentDidMount() {
    var words = this.props.article.fullText.split(' ');
    var badWords = {
      'a': true, 
      'the': true, 
      'to': true, 
      'and': true, 
      'of': true, 
      'in': true, 
      'him': true, 
      'her': true, 
      'at': true,
      'as': true,
      'was': true,
      'on': true,
      'who': true,
      'she': true,
      'he': true,
      'said': true,
      'is': true,
      'said': true,
      'be': true,
      'or': true,
      'that': true,
      'for': true,
      '-': true,
      '--': true,
      'with': true,
      'been': true,
      'this': true,
      'are': true,
      'The': true,
      'by': true,
      'such': true,
      'which': true,
      'has': true,
      'his': true,
      'had': true,
      'AP': true,
      'will': true,
      'it': true,
      'I': true,
      'its': true,
      'these': true,
      'but': true,
    };
    var wordsObj = {};
    words.forEach(word => {
      if (badWords[word] === undefined) {
        if (wordsObj[word]) {
          wordsObj[word]++;
        } else {
          wordsObj[word] = 1;
        }
      }  
    })
    var results = [];
    for (var key in wordsObj) {
      if (wordsObj[key] > 1) {
        results.push({
          value: key,
          count: wordsObj[key]
        })
      }  
    }
    this.setState({
      wordCloud: results,
    })
  }

  render() {
    return (
      <div className="article">
        <div className="article-thumbnail">
          <img className="article-thumbnail-image" src={this.props.article.image} /> 
        </div>
        <Panel bsStyle="default" className="article-panel">
          <Panel.Heading className="article-panel-heading">
            
            {/* <Badge className='nutrition-count' style={{backgroundColor: 'transparent'}}pullRight>{this.renderCarrots()}</Badge> */}
            {this.renderCarrots()}
          </Panel.Heading>
          <Panel.Body className="article-panel-body">
            <TagCloud minSize={40} maxSize={60} colorOptions={{hue: 'blue'}} tags={this.state.wordCloud}/>
            <ApolloConsumer>
              { client => (
                <div className="read-now-wrapper">
                <Button bsSize="large" bsStyle="success" className="read-now"       
                  onClick={async () => {
                    const {data} = await client.query({
                      query: GET_ONE_FULL_ARTICLE,
                      variables: {_id: this.props.article._id}
                    })
                    console.log('full article incoming', data.article);
                    this.setState({
                      fullArticle: data.article,
                      showArticle: true,
                    })
                    this.props.setCurrentArticleId(this.props.article._id);
                  }}
                >
                Read Now
              </Button>
              </div>
              )}
            </ApolloConsumer>  
          </Panel.Body>
        </Panel>

        {/* The card component has three modals that it launches in series.  Props are passed down from card to these modals */}
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
          userId = {this.props.userId}
          articleId={this.props.article._id}
          articleStance={this.props.article.articleStance}
          userStance={this.props.userStance}
          nutritionalValue={calculateNutritionalValue(this.props.userStance, this.props.article.articleStance )}
        />
        <CompletedModal
          show={this.state.showCompleted}
          handleClose={this.handleClose}
          article={this.state.fullArticle}
          veggies={this.renderCarrots()}
          setCurrentArticleId ={this.props.setCurrentArticleId}
        />
      </div>

      // <Mutation mutation={DELETE_ARTICLE} update={updateCache}>
      // { (deleteArticle) => {
      //   return (
      //     <div className="article">
      //       <Panel bsStyle="success">
      //           <Panel.Heading className='title'>
      //             <button className='delete-article-button' onClick={() => deleteArticle({ variables: { _id: this.props.article._id } })}> X </button>
      //             <Panel.Title>{this.props.article.title}</Panel.Title>
      //             <Badge id='nutrition-count' bsStyle="danger">{this.renderCarrots()}</Badge>
      //           </Panel.Heading>
      //           <Panel.Body>
      //             <h3 className="article-card-title">{this.props.article.title}</h3>
      //             <img className="article-thumbnail" src={this.props.article.image} />
      //             {/* <p>{this.props.article.description}</p> */}
      //           </Panel.Body>
      //           <ApolloConsumer>
      //             { client => (
      //               <Button 
      //                 className="eat-me" 
      //                 bsStyle="info" 
      //                 bsSize="large" 
      //                 onClick={async () => {
      //                   const {data} = await client.query({
      //                     query: GET_ONE_FULL_ARTICLE,
      //                     variables: {_id: this.props.article._id}
      //                   })
      //                   console.log('full article incoming', data.article);
      //                   this.setState({
      //                     fullArticle: data.article,
      //                     showArticle: true,
      //                   })
      //                 }}
      //               >
      //               Eat me
      //             </Button>
      //             )}
      //           </ApolloConsumer>
      //       </Panel>
      //     </div>
      //   )}}
      // </Mutation>
    );
  }
}

export default ArticleCard;