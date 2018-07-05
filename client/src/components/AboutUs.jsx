import React from 'react';
import AboutOurSourcesPanel from './AboutOurSourcesPanel.jsx';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import { Query } from 'react-apollo';
import { GET_LIST_OF_SOURCES } from '../apollo/serverQueries';
import AboutYou from './AboutYou.jsx';
import Sidebar from './Sidebar.jsx';

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
          <PanelGroup accordion id="accordion">
            <Panel eventKey="1">
              <Panel.Heading>
                <Panel.Title toggle>About Us</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                We are a fierce group of truth-speaking students fighting for justice and striving for transparency.
              </Panel.Body>
            </Panel>
            <Panel eventKey="2">
              <Panel.Heading>
                <Panel.Title toggle>About You</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <AboutYou />
              </Panel.Body>
            </Panel>
            <Query query={GET_LIST_OF_SOURCES}>
              {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                return <AboutOurSourcesPanel sources={data}/>
              }}
            </Query>
          </PanelGroup>
          </div>
      </div>
    )
  }
}

export default AboutUs;