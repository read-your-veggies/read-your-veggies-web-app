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

  // This function will be deprecated in later versions of React.
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }


  render() {
    // console.log('speedometer', this.props);
    let polValueString = '';
    if (this.props.sidebar === true) {
      polValueString = ' ';
    } else if (this.state.value < -0.6) {
      polValueString = 'Very Liberal';
    } else if (this.state.value < -0.2) {
      polValueString = 'Leaning Liberal';
    } else if (this.state.value < 0.2) {
      polValueString = 'Mostly Centrist';
    } else if (this.state.value < 0.6) {
      polValueString = 'Leaning Conservative';
    } else if (this.state.value <= 1) {
      polValueString = 'Very Conservative';
    }
    return (
      <div className='speedometer-wrapper' style={{width: '100%', height: "100%"}}>
        <ReactSpeedometer
          minValue={this.props.min}
          maxValue={this.props.max}
          
          // this value will ultimately be a query for the user's score!
          value={this.state.value.toPrecision(3)}
          currentValueText={polValueString}
          needleColor="rgb(51,51,51)"
          startColor={this.props.startColor}
          segments={5}
          endColor={this.props.endColor}
          textColor='rgb(51,51,51)'
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

