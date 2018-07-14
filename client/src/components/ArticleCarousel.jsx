import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_ARTICLES_FROM_SERVER } from '../apollo/serverQueries';
import ArticleCard from './ArticleCard.jsx';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { calculateNutritionalValue } from '../lib/calculateStance.js';
import { GET_COMPLETED_ARTICLES } from '../apollo/serverQueries.js';
import Loading from './Loading.jsx';
import Error from './Error.jsx';


class ArticleCarousel extends Component {
  state = {
    user_stance: 0,
    currentArticleId: null,
  }

  setCurrentArticleId = (id) => {
    this.setState({
      currentArticleId: id,
    });
  }

  shuffle = (data, completedArticleKeys) => {
    let articles = data.slice();
    return articles.filter(article => {
      let carrotCount = calculateNutritionalValue(this.props.userData.user_stance, article.articleStance, article.fullText.length);
      return article._id === this.state.currentArticleId || (carrotCount > 0 && completedArticleKeys.indexOf(article._id) < 0 && article.fullText.length > 1000);
    });
  }


  render() {
    return (
      <Query query={GET_COMPLETED_ARTICLES} variables={{ _id: this.props.userData._id }}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return `Error! ${error.message}`;
          let completedArticleInfo = JSON.parse(data.user.completed_articles);
          let completedArticleKeys = Object.keys(completedArticleInfo);

          return (
            <Query query={GET_ARTICLES_FROM_SERVER}>
              {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) {
                  console.error(`Error! ${error.message}`);
                  return <Error />
                }
                let shuffled = this.shuffle(data.articles, completedArticleKeys);

                return (
                  <div className="articles-container">
                  <CarouselProvider
                    lockOnWindowScroll={true}
                    isPlaying={false}
                    totalSlides={50}
                    visibleSlides={1}
                  >        
                    <Slider>
                      {shuffled.map((article, i) => {
                        return (
                          <Slide index={i}>
                            <ArticleCard 
                              article={article}
                              userId={this.props.userData._id}
                              userStance={this.props.userData.user_stance}
                              setCurrentArticleId={this.setCurrentArticleId}
                            />
                          </Slide>
                        )
                      })}
                    </Slider>
                    <div className="next-article-wrapper">
                      <ButtonNext className="btn btn-info btn-sm">Nah, show me another article</ButtonNext>
                    </div>
                  </CarouselProvider>
                  </div>
                );
              }}
            </Query>
          )
        }}
      </Query>
    );
  }
}

export default ArticleCarousel;