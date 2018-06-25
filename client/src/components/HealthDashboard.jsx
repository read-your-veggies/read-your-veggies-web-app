import React from 'react';
import { withRouter } from "react-router-dom";

import HealthSpeedometer from './HealthSpeedometer.jsx';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HealthSpeedometer 
        height={300}
        width={600}
      />
    );
  }

}

export default HealthSpeedometer;