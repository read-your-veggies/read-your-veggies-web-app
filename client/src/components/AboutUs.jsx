import React from 'react';
import AboutOurSourcesPanel from './AboutOurSourcesPanel.jsx';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import { Query } from 'react-apollo';
import { GET_LIST_OF_SOURCES } from '../apollo/serverQueries';
import AboutYou from './AboutYou.jsx';
import Sidebar from './Sidebar.jsx';
import Loading from './Loading.jsx';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divHeight: '',
    }
  }

  componentDidMount() {
    this.setState({divHeight: window.innerHeight - 147 + 'px'});
  }

  render() {
    return (
      <div className="about-us-container">
        <Sidebar />
        <div id='about-us-inner-content' style={{height: this.state.divHeight}}> 
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