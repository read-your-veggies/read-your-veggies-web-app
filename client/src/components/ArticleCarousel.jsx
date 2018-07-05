import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_ARTICLES_FROM_SERVER } from '../apollo/serverQueries';
import ArticleCard from './ArticleCard.jsx';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { calculateNutritionalValue } from '../lib/calculateStance.js';



class ArticleCarousel extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user_stance: 0,
    }
  }

  render() {
    return (
      <Query query={GET_ARTICLES_FROM_SERVER}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div className="articles-container">
              {/* {data.articles.map((article, i) => (
                <ArticleCard 
                  article={article}
                  userId={this.props.userData._id}
                  userStance={this.props.userData.user_stance}
                />
              ))} */}
            <CarouselProvider
              lockOnWindowScroll={true}
              isPlaying={false}
              // naturalSlideWidth={500}
              // naturalSlideHeight={200}
              totalSlides={50}
              visibleSlides={1}
            >        
              <Slider>
                {console.log('user data for carousel', this.props.userData)}
                {data.articles.map((article, i) => {

                  let carrotCount = calculateNutritionalValue(this.props.userData.user_stance, article.articleStance);
                  // IF article meets certain criteria THEN we display it here.
                  // Need to know how many carrots.
                  if (carrotCount > 0) {
                    return (
                      <Slide index={i}>
                      <ArticleCard 
                        article={article}
                        userId={this.props.userData._id}
                        userStance={this.props.userData.user_stance}
                      />
                      </Slide>
                    )
                  }
                })}
              </Slider>
              {/* <ButtonBack>Back</ButtonBack> */}
              <div className="next-article-wrapper">
                <ButtonNext className="btn btn-info btn-sm" >Nah, show me another article</ButtonNext>
              </div>
            </CarouselProvider>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ArticleCarousel;