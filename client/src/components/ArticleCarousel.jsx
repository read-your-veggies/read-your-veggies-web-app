import React, { Component } from 'react';
import { Query } from "react-apollo";
import { GET_ARTICLES_FROM_SERVER } from '../apollo/serverQueries';
import ArticleCard from './ArticleCard.jsx';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


class ArticleCarousel extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      onboardSlant: 0,
    }
  }

  componentDidMount() {
    this.calculateOnboardSlant();
  }

  calculateOnboardSlant() {
    var onboardInfo = JSON.parse(this.props.userData.onboard_information);
    //slant: -100 : 100
    var slant = onboardInfo.slantSlider;
    //viewOnParents: -100 : 100
    var viewOnParents = onboardInfo.parentSlider;

    // if view of parents === 0, ignore it.
    if (viewOnParents === 0) {
      slant = slant / 100;
    } else {
      slant = (slant * Math.abs(viewOnParents)) / 10000;
    }

    console.log('the slant is', slant);
    this.setState({
      onboardSlant: slant,
    }, console.log('the slant is', this.state))



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
                      <ArticleCard article={article} onboardSlant={this.state.onboardSlant}/>
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