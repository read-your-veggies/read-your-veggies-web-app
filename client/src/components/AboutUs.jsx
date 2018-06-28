import React from 'react';
import AboutOurSourcesPanel from './AboutOurSourcesPanel.jsx';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';

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
          <AboutOurSourcesPanel />
        </PanelGroup>
      </div>
    )
  }
}

export default AboutUs;