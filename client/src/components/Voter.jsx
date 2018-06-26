import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import { UPDATE_ARTICLE_VOTES } from '../apollo/resolvers';
import { Mutation } from "react-apollo";

class Voter extends React.Component {
  constructor(props) {
    super(props);
    console.log('voter props', props);
    // The props include the article ID.

    this.state = {
      agree: false,
      disagree: false,
      fun: false,
      bummer: false,
      worthyAdversary: false,
      mean: false
    }

    // func bindings here
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange (e) {
    console.log('state', this.state);
    console.log('event', e.target);
    this.setState({
      [e.target.value]: !this.state[e.target.value]
    });
  }


  render() {
    return (
      <Mutation mutation={UPDATE_ARTICLE_VOTES} >
        { (updateArticleVotes) => {
          return (
            <Panel bsStyle="info" className="voting-panel">
            <Panel.Heading>
              <h3>Vote on this article!</h3>
            </Panel.Heading>
            <Panel.Body>
            <form className="voter-form">
              <FormGroup>
                <div className="voter-form-left">
                <Checkbox value="agree" checked={this.state.agree} onChange={this.handleCheckboxChange}>
                  Agree
                </Checkbox>
                <Checkbox value="fun" checked={this.state.fun} onChange={this.handleCheckboxChange}>
                  Fun
                </Checkbox>
                <Checkbox value="worthyAdversary" checked={this.state.worthyAdversary} onChange={this.handleCheckboxChange}>
                  Worthy Adversary
                </Checkbox>
                </div>
                <div className="voter-form-right">
                <Checkbox value="disagree" checked={this.state.disagree} onChange={this.handleCheckboxChange}>
                  Disagree
                </Checkbox>
                <Checkbox value="bummer" checked={this.state.bummer} onChange={this.handleCheckboxChange}>
                  Bummer
                </Checkbox>
                <Checkbox value="mean" checked={this.state.mean} onChange={this.handleCheckboxChange}>
                  Mean
                </Checkbox>
                </div>
              </FormGroup>
              <Button bsStyle="primary" onClick={(e) => {
                let votes = {
                  "agree" : this.state.agree, 
                  "disagree" : this.state.disagree,  
                  "fun" : this.state.fun,  
                  "bummer" : this.state.bummer,  
                  "mean" : this.state.mean,  
                  "worthyAdversary" : this.state.worthy,  
                }
                e.preventDefault();
                console.log('submitting vote', votes);
                updateArticleVotes({ variables: { _id: this.props.articleId, votes: votes } })
              }}>
                Submit
              </Button>
            </form>
            </Panel.Body>
            </Panel>
        )}}
      </Mutation>
    )
  }
  
}

export default Voter;