import React from 'react';
import './Login.scss';
import OpenDropLogo from './logo';
import { Navigate } from "react-router-dom";
import  HeaderTop  from './header';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: false,
      errorMessage: "",
      redirectToHome: false,
    }
  }

  componentDidMount() {
    console.log("COMPONENT LOGIN FORM MOUNTED");

    var defaultTab = document.getElementById("signin")
    defaultTab.setAttribute("checked", true)
  }

  handleErrors(response) {
    console.log("HANDLE ERROR TRIGGER")
    console.log(response)
    if (response.ok) {
      return false
    }
    //401 Unauthorized
    if (response.status == 401) {
      this.setState(
        {
          error : true,
          errorMessage : "Invalid Username/Password",
        })
    } else {
      this.setState(
        {
          error : true,
          errorMessage : "Unexpected error happened",
        })
    }
    return true
  }

  async loginUser(credentials) {

    let requestResp
    try {
      requestResp = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    }
    catch (error) {
      this.setState(
        {
          error : true,
          errorMessage : "Unable to reach server"
        }
      )
      console.log(error)
      return
    }
    //No network error, handle regular errors
    if (!this.handleErrors(requestResp)) {
    //TODO : empty body error case
    //console.log(requestResp)
    return requestResp.json()
    }
 }

  async handleLoginSubmit(e) {
    e.preventDefault();
      this.setState(
        {
          error : false,
        }
      )
 
    console.log("HANDLE SUBMIT TRIGGER");

    let username = this.state.username;
    let password = this.state.password;
    const token = await this.loginUser({
      username,
      password
    });
    console.log(token)
    if (token) {
    //TODO : local store the token
    //localStorage.setItem('token', JSON.stringify(token));
    this.props.state.loggedInCallback(username,token)
    //setToken(token);
    this.setState({
      redirectToHome : true
    })
    }

  }

  setUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  setPassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    if ( this.state.redirectToHome ){
      return <Navigate to="/"/>
    }
    return (
      <React.Fragment>
         <HeaderTop state={this.props.state}/> 

      <div className="login_container">
       <div className="logo_container">
          {OpenDropLogo()}
          <br></br>
          OpenDrop
        </div>
        <div className="notification_panel" style={{display:  this.state.error ? 'table-cell' : 'none' }}>
          {this.state.errorMessage}
        </div>
 
        <input id="signin" type="radio" name="tab" />
        <input id="register" type="radio" name="tab" />
        <div className="pages">
          <div className="page">
            <form onSubmit={this.handleLoginSubmit.bind(this)} >
              <div className="input">
                <div className="title"> USERNAME</div>
                <input className="text" type="text" placeholder="" value={this.state.username} onChange={this.setUsername.bind(this)} />
              </div>
              <div className="input">
                <div className="title"> PASSWORD</div>
                <input className="text" type="password" placeholder="" value={this.state.password} onChange={this.setPassword.bind(this)} />
              </div>
              <div className="input">
                <input type="submit" value="LOG IN" />
              </div>
            </form>
          </div>
          <div className="page signup">
            <div className="input">
              <div className="title"> USERNAME</div>
              <input className="text" type="text" placeholder="" />
            </div>
            <div className="input">
              <div className="title"> PASSWORD</div>
              <input className="text" type="password" placeholder="" />
            </div>
            <div className="input">
              <div className="title"> EMAIL</div>
              <input className="text" type="password" placeholder="" />
            </div>
            <div className="input">
              <input type="submit" value="REGISTER" />
            </div>
          </div>
        </div>
        <div className="tabs">
          <label className="tab text" htmlFor="signin">
            Log In</label>
          <label className="tab text" htmlFor="register">
            Register</label>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

export default LoginForm
