import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";

class HealthSpeedometer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    }
  }

  componentDidMount() {
    this.setState({
      value: this.props.value,
    });
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      value: this.props.value,
    });
  }


  render() {
    console.log('speedometer', this.props);
    return (
      <div className='speedometer-wrapper' style={{width: '100%', height: "100%"}}>
        <ReactSpeedometer
          minValue={this.props.min}
          maxValue={this.props.max}
          
          // this value will ultimately be a query for the user's score!
          value={this.state.value}
          currentValueText='Media Health: ${value}'

          needleColor="rgb(25,120,29)"
          startColor={this.props.startColor}
          segments={7}
          endColor={this.props.endColor}
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

