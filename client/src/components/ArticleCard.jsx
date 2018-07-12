import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Voter from './Voter.jsx';
import ArticleModal from './ArticleModal.jsx';
import CompletedModal from './CompletedModal.jsx';
import { GET_ONE_FULL_ARTICLE } from '../apollo/serverQueries';
import { ApolloConsumer } from "react-apollo";
import { calculateNutritionalValue } from '../lib/calculateStance.js';
import { TagCloud } from "react-tagcloud";
import { badWords } from '../lib/badwords.js';

class ArticleCard extends React.Component {
  state = {
    showArticle: false,
    showVoter: false,
    showCompleted: false,
    fullArticle: {},
    wordCloud: [],
    startTime: null,
  };

  // There are three modals launched from ArticleCard.  Their closing and opening is handled by these functions.
  handleClose = (modalType) => {
    if (modalType === 'article') {
      this.setState({ showArticle: false });
    } else if (modalType === 'voter') {
      this.setState({ showVoter: false });
    } else if (modalType === 'completed') {
      this.setState({ showCompleted: false });
    }
  }

  handleShow = (modalType) => {
    if (modalType === 'article') {
      this.setState({ showArticle: true });
    } else if (modalType === 'voter') {
      this.setState({ showVoter: true });
    } else if (modalType === 'completed') {
      this.setState({ showCompleted: true });
    }
  }

  renderCarrots = (align) => {
    let nutritionalValue = calculateNutritionalValue(this.props.userStance, this.props.article.articleStance, this.props.article.fullText.length )
    return (<h3 className={align}>{'🥕'.repeat(nutritionalValue)}</h3>);
  }

  componentDidMount() {
    let words = this.props.article.fullText.split(' ');
    
    let wordsObj = {};
    words.forEach(word => {
      if (badWords[word] === undefined) {
        if (wordsObj[word]) {
          wordsObj[word]++;
        } else {
          wordsObj[word] = 1;
        }
      }  
    })
    let results = [];
    for (let key in wordsObj) {
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
            {this.renderCarrots('carrots-right')}
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
                    
                    this.setState({
                      fullArticle: data.article,
                      startTime: Date.now(),
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
          startTime = {this.state.startTime}
        />
        <Voter
          show={this.state.showVoter}
          handleClose = {this.handleClose}
          handleShow = {this.handleShow}
          userId = {this.props.userId}
          articleId={this.state.fullArticle._id}
          articleStance={this.state.fullArticle.articleStance}
          userStance={this.props.userStance}
          nutritionalValue={calculateNutritionalValue(this.props.userStance, this.props.article.articleStance, this.props.article.fullText.length )}
        />
        <CompletedModal
          show={this.state.showCompleted}
          handleClose={this.handleClose}
          article={this.state.fullArticle}
          veggies={this.renderCarrots('carrots-center')}
          setCurrentArticleId ={this.props.setCurrentArticleId}
        />
      </div>
    );
  }
}

export default ArticleCard;