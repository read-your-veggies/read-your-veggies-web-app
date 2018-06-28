import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";

class HealthSpeedometer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onboardSlant: 0,
    }
  }

  componentDidMount() {
    if (this.props.userStats !== undefined && this.props.userStats !== 'NEED_ON_BOARDING') {
      this.calculateOnboardSlant();
    }
  }

  UNSAFE_componentWillReceiveProps() {
    if (this.props.userStats !== undefined && this.props.userStats !== 'NEED_ON_BOARDING') {
      this.calculateOnboardSlant();
    }
  }

  calculateOnboardSlant() {

    var onboardInfo = JSON.parse(this.props.userStats);
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

    this.setState({
      onboardSlant: slant,
    })
  }

  render() {
    console.log('speedometer', this.props);
    return (
      <div className='speedometer-wrapper' style={{width: '100%', height: "100%"}}>
        <ReactSpeedometer
          minValue={-1}
          maxValue={1}
          
          // this value will ultimately be a query for the user's score!
          value={this.state.onboardSlant}
          currentValueText='Media Health: ${value}'

          needleColor="rgb(25,120,29)"
          startColor="blue"
          segments={7}
          endColor="red"
          textColor='#ff77e8'
          needleTransitionDuration={10000}
          needleTransition="easeElastic"
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    );
  }
}

export default HealthSpeedometer;

