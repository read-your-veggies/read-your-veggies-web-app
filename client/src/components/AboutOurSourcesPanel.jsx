import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import {BarChart} from 'react-easy-chart';
import { ApolloConsumer } from "react-apollo";
import { GET_SOURCE_PERSONALITY } from '../apollo/serverQueries';

class AboutOurSourcesPanel extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      sources: [],
      data: {
        'needs': [],
        'values': [],
        'personality': [],
        'traits': [],
      },
      currentAttribute: 'needs',
      attributes: ['needs', 'values', 'personality', 'traits'],
    }

    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.setPersonality = this.setPersonality.bind(this);
    this.setSources = this.setSources.bind(this);
  }

  componentDidMount() {
    this.setSources(this.props.sources);
  }

  handleAttributeChange(e) {
    this.setState({
      currentAttribute: e.target.value,
    })
  }

  setSources(data) {
    var sources = data.sources.map(source => {
      return source.name;
    });
    this.setState({
      sources: sources,
    });
  }

  setPersonality(data) {
    if (data.source.fullTextsPersonality !== null) {
      var parsedData = JSON.parse(data.source.fullTextsPersonality);
      var newData = {};
  
      for (var key in parsedData) {
        if (key === 'needs' || key === 'values') {
          newData[key] = [];
          parsedData[key].forEach(trait => {
            newData[key].push({
              x: trait.name,
              y: trait.percentile * 100,
            })
          })
        } else if (key === 'personality') {
          newData['personality'] = [];
          newData['traits'] = [];
          parsedData.personality.forEach(bigTrait => {
            newData['personality'].push({
              x: bigTrait.name,
              y: bigTrait.percentile * 100,
            })
            bigTrait.children.forEach(smallTrait => {
              newData['traits'].push({
                x: smallTrait.name,
                y: smallTrait.percentile * 100,
              })
            })
          })
        }
      }
  
      this.setState({
        data: newData,
      });
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
                    query: GET_SOURCE_PERSONALITY,
                    variables: {name: "Fox News"},
                  })
                  this.setPersonality(data);
                }}
              >
              About Our Sources
            </Panel.Title>
            )}
          </ApolloConsumer>
        </Panel.Heading>

        <Panel.Body collapsible>
          <div className="about-our-sources-header">
            <div className="about-our-sources-left-side">
              <p>We source articles from a variety of major news outlets and build personality profiles over time using IBM Watson's Personality Insights.</p> 
              <ApolloConsumer>
                { client => (
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Source</ControlLabel>
                    <FormControl 
                      componentClass="select" 
                      placeholder="select" 
                      onChange={async (e) => {
                        console.log('clicked', e.target.value);
                        const {data} = await client.query({
                          query: GET_SOURCE_PERSONALITY,
                          variables: {name: e.target.value},
                        })
                        this.setPersonality(data);
                      }}
                    >
                    {this.state.sources.map((sourceName, index) => {
                      return <option value={sourceName}>{sourceName}</option>
                    })}
                  >
                  </FormControl>
                </FormGroup>
                )}
              </ApolloConsumer>

              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Attribute</ControlLabel>
                <FormControl 
                  componentClass="select" 
                  placeholder="select" 
                  onChange={this.handleAttributeChange}
                >
                  {this.state.attributes.map((attributeName, index) => {
                    return <option value={attributeName}>{attributeName}</option>
                  })}    
                </FormControl>
              </FormGroup>
            </div>

            <img id="watson-logo" src='../assets/watson.png' /> 
          </div>

          <BarChart
            axisLabels={{y: 'Percentile'}}
            yDomainRange={[0, 100]}
            width={1000}
            height={400}
            colorBars
            axes
            margin={{top: 20, right: 20, bottom: 30, left: 40}}
            data={this.state.data[this.state.currentAttribute]}
          />
        </Panel.Body>
      </Panel>
    )
  }
}

export default AboutOurSourcesPanel;