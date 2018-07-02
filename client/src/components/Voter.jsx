import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import { UPDATE_ARTICLE_VOTES, UPDATE_USER_VOTES } from '../apollo/resolvers';
import { Mutation } from "react-apollo";
import Modal from 'react-bootstrap/lib/Modal';
import { withRouter } from "react-router-dom";



class Voter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      agree: false,
      disagree: false,
      fun: false,
      bummer: false,
      worthyAdversary: false,
      mean: false
    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.submitVote = this.submitVote.bind(this);
  }

  handleCheckboxChange (e) {
    this.setState({
      [e.target.value]: !this.state[e.target.value]
    });
  }

  // When done, close this modal, open the CompletedModal
  submitVote() {
    this.props.handleClose('voter');
    this.props.handleShow('completed');
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.props.handleClose('voter')}>
      <Modal.Body>
        <Panel bsStyle="info" className="voting-panel">
        <Panel.Heading>
          <h3>Vote on this article!</h3>
        </Panel.Heading>
        <Panel.Body>
        <form className="voter-form">
          <FormGroup>
            <div className="voter-form-left">
            <Checkbox inline value="agree" checked={this.state.agree} onChange={this.handleCheckboxChange}>
              Agree
            </Checkbox>
            <Checkbox inline value="fun" checked={this.state.fun} onChange={this.handleCheckboxChange}>
              Fun
            </Checkbox>
            <Checkbox inline value="worthyAdversary" checked={this.state.worthyAdversary} onChange={this.handleCheckboxChange}>
              Worthy Adversary
            </Checkbox>
            </div>
            <div className="voter-form-right">
            <Checkbox inline value="disagree" checked={this.state.disagree} onChange={this.handleCheckboxChange}>
              Disagree
            </Checkbox>
            <Checkbox inline value="bummer" checked={this.state.bummer} onChange={this.handleCheckboxChange}>
              Bummer
            </Checkbox>
            <Checkbox inline value="mean" checked={this.state.mean} onChange={this.handleCheckboxChange}>
              Mean
            </Checkbox>
            </div>
          </FormGroup>
          <Mutation mutation={UPDATE_ARTICLE_VOTES} >
            { (updateArticleVotes) => {
              return (
                <Mutation mutation={UPDATE_USER_VOTES}>
                  {(updateUserVotes) => {
                    return (
                      <Button bsStyle="primary" onClick={(e) => {
                        let { articleId, userId, articleStance, userStance, nutritionalValue } = this.props;  
                  
                        let userVoteInfo = {};
                        userVoteInfo[articleId] = {
                          'articleStance': articleStance,
                          'votes': this.state,
                          'userStance': userStance,
                          'completed': Date.now(),
                          'nutritionalValue': nutritionalValue,
                        }
                        e.preventDefault();
                        updateArticleVotes({ variables: { _id: this.props.articleId, votes: this.state } })
                        updateUserVotes({ variables: { _id: this.props.userId, completed_articles: JSON.stringify(userVoteInfo) } })
                        this.submitVote();
                      }}>
                        Submit
                      </Button>
                    )
                  }}
                </Mutation >
                )}}
                </Mutation>
              </form>
              </Panel.Body>
              </Panel>
      </Modal.Body>
      </Modal>
    )
  }
  
}

export default withRouter(Voter);