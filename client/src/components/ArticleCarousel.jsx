import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_ARTICLES_FROM_SERVER } from '../apollo/serverQueries';
import ArticleCard from './ArticleCard.jsx';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { calculateNutritionalValue } from '../lib/calculateStance.js';
import { GET_ONE_FULL_ARTICLE, GET_COMPLETED_ARTICLES } from '../apollo/serverQueries.js';
import Loading from './Loading.jsx';
import Error from './Error.jsx';


class ArticleCarousel extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user_stance: 0,
      currentArticleId: null,
    }

    this.setCurrentArticleId = this.setCurrentArticleId.bind(this);
  }

  setCurrentArticleId(id) {
    this.setState(
      {currentArticleId: id},
      ()=> {console.log(this.state)}
    );
  }

  render() {
    return (
      <Query query={GET_COMPLETED_ARTICLES} variables={{ _id: this.props.userData._id }}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return `Error! ${error.message}`;
          var completedArticleInfo = JSON.parse(data.user.completed_articles);
          var completedArticleKeys = Object.keys(completedArticleInfo);

          return (
            <Query query={GET_ARTICLES_FROM_SERVER}>
              {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) {
                  console.log(`Error! ${error.message}`);
                  return <Error />
                }
                console.log('articles data', data.articles);

                // let shuffledArticles = data.articles.slice();
                // for (var i = 0; i < shuffledArticles.length; i++) {
                //   var randomIdx = Math.floor( Math.random() * shuffledArticles.length);
                //   var swapper = shuffledArticles[randomIdx];
                //   shuffledArticles[randomIdx] = shuffledArticles[i];
                //   shuffledArticles[i] = swapper;
                // }
                // console.log('randomized articles', shuffledArticles);

                return (
                  <div className="articles-container">
                  <CarouselProvider
                    lockOnWindowScroll={true}
                    isPlaying={false}
                    // naturalSlideWidth={500}
                    // naturalSlideHeight={200}
                    totalSlides={50}
                    visibleSlides={1}
                  >        
                    <Slider>
                      {data.articles.map((article, i) => {
                        let carrotCount = calculateNutritionalValue(this.props.userData.user_stance, article.articleStance);
                        
                        if ( (carrotCount > 0 && completedArticleKeys.indexOf(article._id) < 0) || this.state.currentArticleId === article._id ) {
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
                        }
                      })}
                    </Slider>
                    <div className="next-article-wrapper">
                      <ButtonNext className="btn btn-info btn-sm" >Nah, show me another article</ButtonNext>
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