import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Panel from 'react-bootstrap/lib/Panel';
import {BarChart} from 'react-easy-chart';
import { ApolloConsumer } from "react-apollo";
import { GET_ONE_FULL_ARTICLE } from '../apollo/serverQueries';

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
                    query: GET_ONE_FULL_ARTICLE,
                    variables: {_id: "5b342a73cfd8db3c74632556"}
                  })
                  console.log('full article incoming', data.article);
                  // this.setState({
                  //   fullArticle: data.article,
                  //   showArticle: true,
                  // })
                }}
              >
              About Our Sources
            </Panel.Title>
            )}
          </ApolloConsumer>
        </Panel.Heading>
        <Panel.Body collapsible>
          <DropdownButton
            bsSize="large"
            title="Source"
            id="dropdown-size-large"
          >
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3">Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
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