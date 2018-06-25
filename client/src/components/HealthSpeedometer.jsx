import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";

class HealthSpeedometer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='speedometer-wrapper' style={{width: '100%', height: "100%"}}>
        <ReactSpeedometer
          minValue={-100}
          maxValue={100}
          
          // this value will ultimately be a query for the user's score!
          value={Math.floor(Math.random() * 201) - 100}
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

