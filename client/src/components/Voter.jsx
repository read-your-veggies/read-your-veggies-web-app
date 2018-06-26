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
      Agree: false,
      Disagree: false,
      Fun: false,
      Bummer: false,
      Worthy: false,
      Mean: false
    }
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
                <Radio value="agree" bsStyle="radio">
                  Agree
                </Radio>
                <Radio value="fun">
                  Fun
                </Radio>
                <Radio name="worthyAdversary">
                  Worthy Adversary
                </Radio>
                </div>
                <div className="voter-form-right">
                <Radio value="disagree">
                  Disagree
                </Radio>
                <Radio name="bummer">
                  Bummer
                </Radio>
                <Radio name="mean">
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