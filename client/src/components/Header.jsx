import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';

const Header = () => {
  return (
    // <Navbar>
    //   <Navbar.Header>
    //     <Navbar.Brand>
    //       <img id="logo" src="./assets/logo.png"/>
    //       <h1>ReadYourVeggies.com</h1>
    //       <p>A news app for a balanced media diet</p>
    //     </Navbar.Brand>
    //   </Navbar.Header>
    //   <Nav pullRight>
    //     <NavItem eventKey={1} href="#">
    //       <Button bsStyle="primary">My Health</Button>
    //     </NavItem>
    //     <NavItem eventKey={2} href="#">
    //       Link
    //     </NavItem>
    //     <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
    //       <MenuItem eventKey={3.1}>Action</MenuItem>
    //       <MenuItem eventKey={3.2}>Another action</MenuItem>
    //       <MenuItem eventKey={3.3}>Something else here</MenuItem>
    //       <MenuItem divider />
    //       <MenuItem eventKey={3.4}>Separated link</MenuItem>
    //     </NavDropdown>
    //   </Nav>
    // </Navbar>
    <div className="header">
      <div className="header-text">
        <h1>Read-Your-Veggies.com</h1>
        <h2>A news app for a balanced media diet</h2>
      </div>
      <img src="./assets/logo.png" />
    </div>
  )
}

export default Header;