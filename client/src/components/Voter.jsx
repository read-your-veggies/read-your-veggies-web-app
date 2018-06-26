import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import Button from 'react-bootstrap/lib/Button';
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
      worthy: false,
      mean: false
    }

    // func bindings here
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleRadioChange (e) {
    console.log('state', this.state);
    this.setState({
      [e.target.value]: !this.state[e.target.value]
    });
  }


  render() {
    // These radio buttons aren't working properly and need a lot of work...
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
                <Radio value="agree" bsStyle="radio" checked={this.state.agree} onChange={this.handleRadioChange}>
                  Agree
                </Radio>
                <Radio value="fun" checked={this.state.fun} onChange={this.handleRadioChange}>
                  Fun
                </Radio>
                <Radio name="worthyAdversary" checked={this.state.worthy} onChange={this.handleRadioChange}>
                  Worthy Adversary
                </Radio>
                </div>
                <div className="voter-form-right">
                <Radio value="disagree" checked={this.state.disagree} onChange={this.handleRadioChange}>
                  Disagree
                </Radio>
                <Radio name="bummer" checked={this.state.bummer} onChange={this.handleRadioChange}>
                  Bummer
                </Radio>
                <Radio name="mean" checked={this.state.mean} onChange={this.handleRadioChange}>
                  Mean
                </Radio>
                </div>
              </FormGroup>
              <Button bsStyle="primary" onClick={(e) => {
              e.preventDefault();
              updateArticleVotes({ variables: { _id: this.props.articleId } })
              console.log('Voting Event', e);
            }}>Submit</Button>
            </form>
            </Panel.Body>
            </Panel>
        )}}
      </Mutation>
    )
  }
  
}

export default Voter;