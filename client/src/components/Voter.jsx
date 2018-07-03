import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import { UPDATE_ARTICLE_VOTES, UPDATE_USER_VOTES } from '../apollo/resolvers';
import { Mutation } from "react-apollo";
import Modal from 'react-bootstrap/lib/Modal';
import { withRouter } from "react-router-dom";



class Voter extends React.Component {
  constructor(props) {
    super(props);

    // State was no longer needed and has been removed.

    this.submitVote = this.submitVote.bind(this);
  }

  // When done, close this modal, open the CompletedModal
  submitVote() {
    this.props.handleClose('voter');
    this.props.handleShow('completed');
  }

  render() {
    const buttons = [
      {label: "Agreed and Enjoyed", votes: {agree: true, fun: true}, class: "agree-enjoy", style: "success"},
      {label: "Agreed and Disliked", votes: {agree: true, bummer: true}, class: "agree-dislike", style: "primary"},
      {label: "Disagreed and Enjoyed", votes: {disagree: true, fun: true}, class: "disagree-enjoy", style: "warning"},
      {label: "Disagreed and Disliked", votes: {disagree: true, bummer: true}, class: "disagree-dislike", style: "danger"},      
    ]

    return (
      <Modal show={this.props.show} onHide={() => this.props.handleClose('voter')}>
      <Modal.Body>
        <Panel bsStyle="info" className="voting-panel">
        <Panel.Heading>
          <h3>Vote on this article!</h3>
        </Panel.Heading>
        <Panel.Body>
          <Mutation mutation={UPDATE_ARTICLE_VOTES} >
            { (updateArticleVotes) => {
              return (
                <Mutation mutation={UPDATE_USER_VOTES}>
                  {(updateUserVotes) => {
                    return (
                      <div>
                      {
                        buttons.map( (button) => {
                          return (
                            <Button bsStyle={button.style} className={button.class} onClick={(e) => {
                              let { articleId, userId, articleStance, userStance, nutritionalValue } = this.props;  
                        
                              let userVoteInfo = {};
                              userVoteInfo[articleId] = {
                                'articleStance': articleStance,
                                'votes': button.votes,
                                'userStance': userStance,
                                'completed': Date.now(),
                                'nutritionalValue': nutritionalValue,
                              }
                              e.preventDefault();
                              updateArticleVotes({ variables: { _id: this.props.articleId, votes: button.votes, userStance: userStance } })
                              updateUserVotes({ variables: { _id: this.props.userId, completed_articles: JSON.stringify(userVoteInfo) } })
                              this.submitVote();
                            }}>
                              {button.label}
                            </Button>
                          )
                        })
                      }
                      </div>
                    )
                  }}
                </Mutation >
              )
            }}
          </Mutation>
        </Panel.Body>
        </Panel>
      </Modal.Body>
      </Modal>
    )
  }
}

export default withRouter(Voter);