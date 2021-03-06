import React from 'react';
import AboutOurSourcesPanel from './AboutOurSourcesPanel.jsx';
import { Query } from 'react-apollo';
import { GET_LIST_OF_SOURCES } from '../apollo/serverQueries';
import Sidebar from './Sidebar.jsx';
import Loading from './Loading.jsx';

class AboutUs extends React.Component {
  state = {
    divHeight: '',
  }

  componentDidMount() {
    this.setState({divHeight: window.innerHeight - 100 + 'px'});
  }

  render() {
    return (
      <div className="about-us-container" style={{height: this.state.divHeight}}>
        <Sidebar location={this.props.location} getUserInfo={this.props.getUserInfo}/>
        <div id='about-us-inner-content' > 
          <Query query={GET_LIST_OF_SOURCES}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />;
              if (error) return `Error! ${error.message}`;
              return <AboutOurSourcesPanel sources={data}/>
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default AboutUs;