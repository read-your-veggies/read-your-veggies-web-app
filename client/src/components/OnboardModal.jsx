import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import { ON_BOARD_USER } from '../apollo/resolvers.js';
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";



class OnboardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      stanceSlider: 0,
      parentSlider: 0,
      veggieSlider: 40,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleStanceChange = this.handleStanceChange.bind(this);
    this.handleParentChange = this.handleParentChange.bind(this);
    this.handleVeggieChange = this.handleVeggieChange.bind(this);
  }
  
  handleStanceChange(value){
    this.setState({
      stanceSlider: value
    })
  }

  handleParentChange(value){
    this.setState({
      parentSlider: value
    })
  }

  handleVeggieChange(value){
    this.setState({
      veggieSlider: value
    })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <Modal id='onboard-modal' show={this.state.show} onHide={this.handleClose}>
        <Modal.Header >
          <Modal.Title>Welcome!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-left">
            <img className="onboard-image" src="./assets/logo.png" />
            <p id='onboard-title'>Read Your Veggies</p>
          </div>
          <div className="modal-body-right">
            <Panel>
              <Panel.Body className="article-full-text">
              <div className='slider-prompt-container'>
              <p id='onboard-subtitle'>To get you started with the most nutritious articles possible, please tell us a little bit about yourself!</p> 
              <h3 id='slider-header'>Where would you place your current political stance?</h3>
                <Slider
                  className='stance-slider'
                  value={this.state.stanceSlider}
                  orientation="horizontal"
                  onChange={this.handleStanceChange}
                  min={-100}
                  max={100}
                  step={1}
                  labels={
                    {
                      '-100':'Very Liberal',
                      '-50':'Liberal',
                      '0':'Center',
                      '50':'Conservative',
                      '100':'Very Conservative'
                      }
                    }
                  tooltip={false}
                />
              </div>
              <div className='slider-prompt-container'>
                <h3 id='slider-header'>How do you feel about your parents' political views?</h3>
                <Slider
                  className='parents-slider'
                  value={this.state.parentSlider}
                  orientation="horizontal"
                  onChange={this.handleParentChange}
                  min={-100}
                  max={100}
                  step={1}
                  labels={
                    {
                      '-100':'🖕',
                      '-50':"🙅",
                      '50':'😌',
                      '100':'💯',
                      }
                    }
                  tooltip={false}
                />
              </div>
              <div className='slider-prompt-container'>
                <h3 id='slider-header'>What is your media diet goal?</h3>
                <Slider
                  className='veggie-slider'
                  value={this.state.veggieSlider}
                  orientation="horizontal"
                  onChange={this.handleVeggieChange}
                  min={10}
                  max={50}
                  step={10}
                  labels={
                    {
                      '10':'10 Veggies',
                      '20':"20 Veggies",
                      '30':"30 Veggies",
                      '40':'40 Veggies',
                      '50':'50 Veggies',
                      }
                    }
                  tooltip={false}
                />
              </div>
              </Panel.Body>
            </Panel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Mutation mutation={ON_BOARD_USER} >
          { (onBoardUser) => {
            return (
              <Button
                id='submit-onboard'
                onClick={(e) => {
                  e.preventDefault();
                  onBoardUser({ variables: { _id: this.props.userId, onboard_info: JSON.stringify(this.state) } });
                  console.log('onboarded!');
                  this.handleClose();
                  setTimeout(() => {
                    this.props.history.push('/dashboard');
                  }, 500)
                }}>Submit!</Button>
              )}}
          </Mutation>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withRouter(OnboardModal);