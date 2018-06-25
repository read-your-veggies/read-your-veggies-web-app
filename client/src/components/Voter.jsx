import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Radio from 'react-bootstrap/lib/Radio';
import Button from 'react-bootstrap/lib/Button';
import { UPDATE_ARTICLE_VOTES } from '../apollo/resolvers';
import { Mutation } from "react-apollo";

class Voter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Mutation mutation={UPDATE_ARTICLE_VOTES} >
        { (updateArticleVotes) => {
          return (
            <form className="voter-form">
              <FormGroup>
                <Radio value="agree" inline>
                  Agree
                </Radio>
                <Radio value="disagree" inline>
                  Disagree
                </Radio>
                <Radio value="fun" inline>
                  Fun
                </Radio>
                <Radio name="bummer" inline>
                  Bummer
                </Radio>
                <Radio name="mean" inline>
                  Mean
                </Radio>
                <Radio name="worthyAdversary" inline>
                  Worthy Adversary
                </Radio>
              </FormGroup>
              <Button onClick={(e) => {
              e.preventDefault();
              console.log(e);
            }}>Submit</Button>
            </form>
        )}}
      </Mutation>
    )
  }
  
}

export default Voter;