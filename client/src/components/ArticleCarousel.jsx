import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_ARTICLES_FROM_SERVER } from '../apollo/serverQueries';
import ArticleCard from './ArticleCard.jsx';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { calculateOnboardStance } from '../lib/calculateStance.js';


class ArticleCarousel extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      onboardStance: 0,
    }
  }

  componentDidMount() {
    console.log('carousel', this.props.userData._id);
    var onboardStance = calculateOnboardStance(this.props.userData.onboard_information);
    this.setState({
      onboardStance: onboardStance,
    })
  }

  render() {
    console.log('carousel rendering');
    return(
      <Query query={GET_ARTICLES_FROM_SERVER}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <CarouselProvider
              lockOnWindowScroll={true}
              isPlaying={true}
              naturalSlideWidth={500}
              naturalSlideHeight={600}
              totalSlides={50}
              visibleSlides={4}
            >        
              <Slider>
                {data.articles.map((article, i) => (
                    <Slide index={i}>
                      <ArticleCard 
                        article={article}
                        userId={this.props.userData._id}
                        onboardStance={this.state.onboardStance}
                      />
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