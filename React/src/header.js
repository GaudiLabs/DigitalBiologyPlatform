import * as React from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import OpenDropLogo from './logo';
import { NavLink } from 'react-router-dom';
import './header.scss';
import {LoggedPicto} from "./graphics";

class HeaderTop extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
        }
    }

  renderNavLogin(state) {
    if (state.loggedIn) {
        return (
          <Nav>
              <div className="username_container">
                <span> {state.username} </span>
                 {LoggedPicto()}
              </div>
              <button onClick={this.props.state.logOut}>Log out</button>
          </Nav> 
        )
    }
    return (
            <Nav>
              <NavLink to="/login" exact >
	            <div className="login_link">Log In </div>
              </NavLink>
            </Nav>
    )
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>

        <NavLink to="/" exact >
          <Navbar.Brand>
            {OpenDropLogo()}
            OpenDrop
          </Navbar.Brand>
        </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav className="logo-title">Platform for Digital Biology</Nav>
            </Nav>
            {this.renderNavLogin(this.props.state)}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
export default HeaderTop