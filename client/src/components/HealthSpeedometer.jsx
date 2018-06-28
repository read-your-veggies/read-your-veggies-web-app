import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { calculateOnboardStance } from '../lib/calculateStance.js';

class HealthSpeedometer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onboardStance: 0,
    }
  }

  componentDidMount() {
    this.setState({
      onboardStance: calculateOnboardStance(this.props.onboardString),
    });
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      onboardStance: calculateOnboardStance(this.props.onboardString),
    });
  }


  render() {
    console.log('speedometer', this.props);
    return (
      <div className='speedometer-wrapper' style={{width: '100%', height: "100%"}}>
        <ReactSpeedometer
          minValue={-1}
          maxValue={1}
          
          // this value will ultimately be a query for the user's score!
          value={this.state.onboardStance}
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

