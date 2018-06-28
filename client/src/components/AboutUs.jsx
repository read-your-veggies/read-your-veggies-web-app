import React from 'react';
import AboutOurSourcesModal from './AboutOurSourcesModal.jsx';
import Button from 'react-bootstrap/lib/Button';

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <h1> About us </h1>
        <h1> About you </h1>
        <Button onClick={() => this.handleShow()}>
          About Our Sources
        </Button>
        <AboutOurSourcesModal show={this.state.show} handleClose={this.handleClose}/>
      </div>
    )
  }
}

export default AboutUs;