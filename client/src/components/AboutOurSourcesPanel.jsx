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
      data: {},
      displayData: [],
      attributes: ['needs', 'values', 'personality', 'traits'],
    }

    this.handleAttributeClick = this.handleAttributeClick.bind(this);
    this.fetchPersonality = this.fetchPersonality.bind(this);
    this.fetchSources = this.fetchSources.bind(this);
  }

  handleAttributeClick(e) {
    this.setState({
      displayData: this.state.data[e.target.name],
    })
  }

  fetchSources(sources) {

  }

  fetchPersonality() {

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
              return (
                <ApolloConsumer>
                  { client => (
                    <MenuItem 
                      eventKey={index} 
                      name={sourceName} 
                      onClick={async (e) => {
                        console.log('clicked', e.target.name);
                        const {data} = await client.query({
                          query: GET_SOURCE_PERSONALITY,
                          variables: {name: e.target.name},
                        })
                        var parsedData = JSON.parse(data.source.fullTextsPersonality);
                        console.log('parsed is', parsedData);
                        var newData = {};
                        for (var key in parsedData) {
                          if (key === 'needs' || key === 'values') {
                            newData[key] = [];
                            parsedData[key].forEach(trait => {
                              newData[key].push({
                                x: trait.name,
                                y: trait.percentile,
                              })
                            })
                          } else if (key === 'personality') {
                            newData['personality'] = [];
                            newData['traits'] = [];
                            parsedData.personality.forEach(bigTrait => {
                              newData['personality'].push({
                                x: bigTrait.name,
                                y: bigTrait.percentile,
                              })
                              bigTrait.children.forEach(smallTrait => {
                                newData['traits'].push({
                                  x: smallTrait.name,
                                  y: smallTrait.percentile,
                                })
                              })
                            })
                          }
                        }
                        console.log('newData is', newData);
                        this.setState({
                          data: newData,
                        });
                      }}
                    >
                    {sourceName}
                    </MenuItem>
                  )}
                </ApolloConsumer>
              )
            })}
          </DropdownButton>    
          <DropdownButton bsSize="large" title="Attribute" id="dropdown-size-large" >
            {this.state.attributes.map((attributeName, index) => {
              return (
                <MenuItem 
                  eventKey={index} 
                  name={attributeName} 
                  onClick={this.handleAttributeClick}
                >
                {attributeName}
                </MenuItem>
              )
            })}
          </DropdownButton>
          <BarChart
            axisLabels={{x: 'Personality Attribute', y: 'Percentile'}}
            width={1000}
            height={500}
            colorBars
            axes
            margin={{top: 20, right: 20, bottom: 30, left: 40}}
            data={this.state.displayData}
          />
        </Panel.Body>
      </Panel>
    )
  }
}

export default AboutOurSourcesPanel;