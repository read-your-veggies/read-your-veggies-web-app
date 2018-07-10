import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import 'react-rangeslider/lib/index.css';


class ChromeExtensionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }
  
  handleClose() {
    this.setState({
      show: false,
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Modal id='onboard-modal' show={this.state.show} onHide={this.handleClose}>
          <Modal.Header >
            <Modal.Title>Get the Chrome Extension</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Panel className="welcome-modal-body">
                <Panel.Body>
                  <div className='chrome-ext-about'>
                    <p>The Read Your Veggies Chrome Extension provides our <strong>Nutrition Algorithm</strong> with additional information about your browsing habits to provide you with the most relevant articles possible.  Download it below:</p>
                    <div className='chrome-ext-btn-container'>
                      <Button bsStyle="success" href='./assets/chromeExtension.zip'>Download Now</Button>
                    </div>
                  </div>
                  <div className='chrome-ext-instructions'>
                    <ol>
                      <li>After downloading the chrome extension .zip file, <strong>unzip</strong> the file</li>
                      <li>Open the Extension Management page by navigating to <code>chrome://extensions</code>.</li>
                      <ul>
                        <li>The Extension Management page can also be opened by clicking on the <strong>Chrome menu</strong>, hovering over <strong>More Tools</strong> then selecting <strong>Extensions</strong>.</li>
                      </ul>
                      <li><strong>Enable Developer Mode</strong> by clicking the toggle switch next to Developer mode.</li>
                      <li>Click the <strong>LOAD UNPACKED</strong> button and select the extension <strong>folder</strong> (not the .zip file).</li>
                    </ol>
                    <img src='./assets/load_extension.png' />
                    <p>Ta-da! The extension has been successfully installed.</p>
                  </div>
                </Panel.Body>
              </Panel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              id='submit-onboard'
              onClick={(e) => {
                e.preventDefault();
                this.handleClose();
              }}>
              Got it
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ChromeExtensionModal;