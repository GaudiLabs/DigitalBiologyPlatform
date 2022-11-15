import * as React from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import OpenDropLogo from './logo';
import { NavLink } from 'react-router-dom';
import './header.scss';
import {LoggedPicto} from "./graphics";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation, faSignOut } from '@fortawesome/free-solid-svg-icons'

class HeaderTop extends React.PureComponent {

    constructor(props) {
        super(props);
    
        this.state = {
        }
    }

  renderNavLogin(loggedIn,username,logOutHandler) {
    console.log("RENDER NAV LOGIN")
    if (loggedIn) {
        return (
          <Nav>
              <div className="username_container">
                <span> {username} </span>
                 {LoggedPicto()}
              </div>
              <button title="Log out" className="header_btn" onClick={logOutHandler}>
                <FontAwesomeIcon icon={faSignOut}/>
              </button>
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
    console.log("RENDER NAV")
    console.log(this.props)
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
            {this.renderNavLogin(this.props.loggedIn, this.props.username, this.props.logOutHandler)}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
export default HeaderTop