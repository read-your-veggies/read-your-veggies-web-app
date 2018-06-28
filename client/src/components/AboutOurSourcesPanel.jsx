import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Panel from 'react-bootstrap/lib/Panel';
import {BarChart} from 'react-easy-chart';
import { ApolloConsumer } from "react-apollo";
import { GET_LIST_OF_SOURCES, GET_SOURCE_PERSONALITY } from '../apollo/serverQueries';

class AboutOurSourcesPanel extends React.Component {
  constructor(props) {
    super(props); 
    
    this.state = {
      sources: [],
      data: [
        {x: 'Man', y: 500}, 
        {x: 'Woman', y: 300},
        {x: 'test', y: 200}
      ],
    }
  }

  render() {
    return (
      <Panel eventKey="3">
        <Panel.Heading>
          <ApolloConsumer>
            { client => (
              <Panel.Title 
                toggle
                onClick={async () => {
                  const {data} = await client.query({
                    query: GET_LIST_OF_SOURCES,
                  })
                  var sources = data.sources.map(source => {
                    return source.name;
                  });
                  this.setState({
                    sources: sources,
                  });
                }}
              >
              About Our Sources
            </Panel.Title>
            )}
          </ApolloConsumer>
        </Panel.Heading>
        <Panel.Body collapsible>
          <DropdownButton bsSize="large" title="Source" id="dropdown-size-large" >
            {this.state.sources.map((sourceName, index) => {
              return <MenuItem eventKey={index}>{sourceName}</MenuItem>
            })}
          </DropdownButton>    
          <BarChart
            axisLabels={{x: 'Personality Attribute', y: 'Percentage'}}
            width={800}
            height={500}
            colorBars
            axes
            margin={{top: 20, right: 20, bottom: 30, left: 40}}
            data={this.state.data}
          />
        </Panel.Body>
      </Panel>
    )
  }
}

export default AboutOurSourcesPanel;