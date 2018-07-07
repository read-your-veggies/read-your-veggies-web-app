import React from 'react';
import { withRouter } from "react-router-dom";
import CompletedArticles from './CompletedArticles.jsx';
import Sidebar from './Sidebar.jsx';

class HealthDashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userId: null,
      divHeight: ''
    }
  }

  componentDidMount() {
    this.setState({
      userId: this.props.getUserInfo.data.userInfo.userId,
      divHeight: window.innerHeight - 147 + 'px'
    })
  }

  render() {
    return (
      <div id='health-dashboard' style={{height: this.state.divHeight}}>
        <Sidebar />
          <div id='health-dashboard-inner-content'>
            <h3>Recent Veggies</h3>
            <CompletedArticles />
        </div>
      </div>
    );
  }
}

export default withRouter(HealthDashboard);