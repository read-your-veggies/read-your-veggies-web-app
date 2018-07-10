import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import { ON_BOARD_USER } from '../apollo/resolvers.js';
import { Mutation } from "react-apollo";
import GettingStartedModal from './GettingStartedModal.jsx';


class OnboardModal extends React.Component {

  state = {
    show: true,
    stanceSlider: 0,
    parentSlider: 0,
    veggieSlider: 40,
    showGettingStartedModal: false,
  };
  
  handleStanceChange = (value) => {
    this.setState({
      stanceSlider: value
    })
  }

  handleParentChange = (value) => {
    this.setState({
      parentSlider: value
    })
  }

  handleVeggieChange = (value) => {
    this.setState({
      veggieSlider: value
    })
  }

  handleClose = () => {
    this.setState({
      show: false,
      showGettingStartedModal: true,
    });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Modal id='onboard-modal' show={this.state.show} onHide={this.handleClose}>
          <Modal.Header >
            <Modal.Title>Welcome!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Panel className='onboard-modal-body'>
                <Panel.Body>
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
                  }}>Submit!</Button>
                )}}
            </Mutation>
          </Modal.Footer>
        </Modal>
        {this.state.showGettingStartedModal ? <GettingStartedModal userId={this.props.userId} /> : null}
      </div>
    );
  }
}

export default OnboardModal;