import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_ARTICLES_FROM_SERVER } from '../apollo/serverQueries';
import ArticleCard from './ArticleCard.jsx';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


class ArticleCarousel extends Component {
  render() {
    return(
      <Query query={GET_ARTICLES_FROM_SERVER}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <CarouselProvider
              naturalSlideWidth={500}
              naturalSlideHeight={600}
              totalSlides={20}
              visibleSlides={4}
            >        
              <Slider>
                {data.articles.map((article, i) => (
                    <Slide index={i}>
                      <ArticleCard article={article}/>
                    </Slide>
                ))}
              </Slider>
              <ButtonBack>Back</ButtonBack>
              <ButtonNext>Next</ButtonNext>
            </CarouselProvider>
          );
        }}
      </Query>
    );
  }
}

export default ArticleCarousel;