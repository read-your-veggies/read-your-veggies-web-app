import React from 'react';
import AboutOurSourcesPanel from './AboutOurSourcesPanel.jsx';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import { Query } from 'react-apollo';
import { GET_LIST_OF_SOURCES } from '../apollo/serverQueries';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PanelGroup accordion id="accordion">
          <Panel eventKey="1">
            <Panel.Heading>
              <Panel.Title toggle>About Us</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              About Us
            </Panel.Body>
          </Panel>
          <Panel eventKey="2">
            <Panel.Heading>
              <Panel.Title toggle>About You</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              About You
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
    )
  }
}

export default AboutUs;