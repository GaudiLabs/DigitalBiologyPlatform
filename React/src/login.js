import React from 'react';
import './Login.scss';
import OpenDropLogo from './logo';
import { Navigate } from "react-router-dom";
import HeaderTop from './header';
import HCaptcha from '@hcaptcha/react-hcaptcha';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      captchaToken: "",
      error: false,
      errorMessage: "",
      success: false,
      successMessage: "",
      email : "",
      redirectToHome: false,
    }
  }

  onVerifyCaptcha(token) {
    console.log("CAPTCHA Verified: " + token)
    this.setState(
      {
        captchaToken: token
      }, () => { console.log("CAPTCHA SET IN STATE") }
    )
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
    if (response.status === 401) {
      this.setState(
        {
          error: true,
          errorMessage: "Invalid Username/Password.",
        })
      //422 Unprocessable entity
    } else if (response.status === 422) {
      this.setState(
        {
          error: true,
          errorMessage: "Captcha authentication failed.",
        })
      //409 Conflict
      }  else if (response.status === 409) {
      this.setState(
        {
          error: true,
          errorMessage: "This username already exists.",
        })
      //400 Bad format
      }  else if (response.status === 400) {
        this.setState(
          {
            error: true,
            errorMessage: "Bad format : check email & other fields.",
          })
    } else {
      this.setState(
        {
          error: true,
          errorMessage: "Unexpected error happened.",
        })
    }
    return true
  }

  async loginUser(credentials) {

    let requestResp
    const route = "/user/login"
    const api_url = process.env.REACT_APP_API_URL

    try {
      requestResp = await fetch(api_url + route, {
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
          error: true,
          errorMessage: "Unable to reach server."
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
        error: false,
      }
    )

    console.log("HANDLE SUBMIT TRIGGER");

    const loginParams = {
      "username": "",
      "password": "",
      "captcha_token": ""
    }

    var loginParamsToSend = Object.create(loginParams)

    loginParamsToSend.username = this.state.username
    loginParamsToSend.password = this.state.password
    loginParamsToSend.captcha_token = this.state.captchaToken

    const token = await this.loginUser(loginParamsToSend);
    console.log(token)
    if (token) {
      //TODO : local store the token
      //localStorage.setItem('token', JSON.stringify(token));
      this.props.state.loggedInCallback(loginParamsToSend.username, token)
      //setToken(token);
      this.setState({
        redirectToHome: true
      })
    }

  }

  async signUpUser(credentials) {

    let requestResp
    const route = "/user"
    const api_url = process.env.REACT_APP_API_URL

    try {
      requestResp = await fetch(api_url + route, {
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
          error: true,
          errorMessage: "Unable to reach server."
        }
      )
      console.log(error)
      return false
    }
    //No network error, handle regular errors
    if (!this.handleErrors(requestResp)) {
      //TODO : empty body error case
      //console.log(requestResp)
      return true//requestResp.json()
    }
    return false
  }



  async handleSignupSubmit(e) {
    e.preventDefault();
    this.setState(
      {
        success : false,
        error: false,
      }
    )

    console.log("HANDLE SINGNUP TRIGGER");

    const signUpParams = {
      "username": "",
      "password": "",
      "email" : "",
      "captcha_token": ""
    }

    var loginParamsToSend = Object.create(signUpParams)

    loginParamsToSend.username = this.state.username
    loginParamsToSend.password = this.state.password
    loginParamsToSend.email = this.state.email
    loginParamsToSend.captcha_token = this.state.captchaToken

    console.log("meh")
    const signupSuccess = await this.signUpUser(loginParamsToSend);
    console.log(signupSuccess)
    if (signupSuccess) {
      this.setState({
        success : true,
        successMessage : "Sign up successfull, You may now log in."
        //redirectToHome: true
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

  setEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  render() {
    if (this.state.redirectToHome) {
      return <Navigate to="/" />
    }
    return (
      <React.Fragment>
        <HeaderTop state={this.props.state} />

        <div className="login_container">
          <div className="logo_container">
            {OpenDropLogo()}
            <br></br>
            OpenDrop
          </div>
          <div className="error_notification_panel" style={{ display: this.state.error ? 'table-cell' : 'none' }}>
            {this.state.errorMessage}
          </div>
          <div className="success_notification_panel" style={{ display: this.state.success ? 'table-cell' : 'none' }}>
            {this.state.successMessage}
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
                <br />
                <HCaptcha sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY} onVerify={this.onVerifyCaptcha.bind(this)}/>
                <div className="input">
                  <input type="submit" value="LOG IN" />
                </div>
              </form>
            </div>
            <div className="page signup">
              <form onSubmit={this.handleSignupSubmit.bind(this)}>
                <div className="input">
                  <div className="title"> USERNAME</div>
                  <input className="text" type="text" placeholder="" value={this.state.username} onChange={this.setUsername.bind(this)} />
                </div>
                <div className="input">
                  <div className="title"> PASSWORD</div>
                  <input className="text" type="password" placeholder="" value={this.state.password} onChange={this.setPassword.bind(this)} />
                </div>
                <div className="input">
                  <div className="title"> EMAIL</div>
                  <input className="text" type="text" placeholder="" value={this.state.email} onChange={this.setEmail.bind(this)} />
                </div>
                <br />
                <HCaptcha sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY} onVerify={this.onVerifyCaptcha.bind(this)}/>
                <div className="input">
                  <input type="submit" value="REGISTER" />
                </div>
              </form>
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
