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

    this.state = {    // Remove these state variables.
      agree: false,
      disagree: false,
      fun: false,
      bummer: false,
      worthyAdversary: false,
      mean: false
    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);  // Removing checkboxes
    this.submitVote = this.submitVote.bind(this);
  }

  handleCheckboxChange (e) {     // Removing checkboxes
    this.setState({
      [e.target.value]: !this.state[e.target.value]
    });
  }

  // When done, close this modal, open the CompletedModal
  submitVote() {    // Submit vote will take arguments for agree/disagree, and enjoyed/disliked
    this.props.handleClose('voter');
    this.props.handleShow('completed');
  }

  render() {
    const buttons = [
      {label: "Agreed and Enjoyed", votes: {agree: true, fun: true}},
      {label: "Agreed and Disliked", votes: {agree: true, bummer: true}},
      {label: "Disagreed and Enjoyed", votes: {disagree: true, fun: true}},
      {label: "Disagreed and Disliked", votes: {disagree: true, bummer: true}},      
    ]

    return (
      <Modal show={this.props.show} onHide={() => this.props.handleClose('voter')}>
      <Modal.Body>
        <Panel bsStyle="info" className="voting-panel">
        <Panel.Heading>
          <h3>Vote on this article!</h3>
        </Panel.Heading>
        <Panel.Body>
        <form className="voter-form">

          {/* How much of the button functionality can be offloaded to a helper function? */}
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
                              // The updateArticleVotes votes argument may need to be changed.
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