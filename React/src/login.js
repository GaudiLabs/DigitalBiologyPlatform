import React from 'react';
import './Login.scss';
import OpenDropLogo from './logo';
import { Navigate } from "react-router-dom";
import HeaderTop from './header';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.captchaObjSignup = React.createRef()

    this.state = {
      username: "",
      password: "",
      captchaToken: "",
      email : "",
      redirectToHome: false,
      fullname: "",
      institution:"",
      website : "",
      bio : "",
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
      toast.error('Invalid Username/Password.', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      //422 Unprocessable entity
    } else if (response.status === 422) {
      toast.error("Captcha authentication failed.", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      //409 Conflict
      }  else if (response.status === 409) {
      toast.error("This username already exists.", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      //400 Bad format
      }  else if (response.status === 400) {
      toast.error("Bad format : check email & other fields.", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
 
    } else {
      toast.error("Unexpected error happened.", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
 
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
      toast.error('Unable to reach server.', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
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

    //remove all notifications
    toast.dismiss()

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
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('username', this.state.username);
      this.setState({
        captchaToken : "",
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
      toast.error('Unable to reach server.', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
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
    this.captchaObjSignup.current.resetCaptcha()

    e.preventDefault();
    //remove all notifications
    toast.dismiss()

    console.log("HANDLE SINGNUP TRIGGER");

    const signUpParams = {
      "username": "",
      "password": "",
      "email" : "",
      "captcha_token": "",
      "bio" : "",
      "fullname" : "",
      "website" : "",
      "institution" :"" ,
    }

    var loginParamsToSend = Object.create(signUpParams)

    loginParamsToSend.username = this.state.username
    loginParamsToSend.password = this.state.password
    loginParamsToSend.email = this.state.email
    loginParamsToSend.captcha_token = this.state.captchaToken
    loginParamsToSend.bio = this.state.bio
    loginParamsToSend.fullname = this.state.fullname
    loginParamsToSend.website = this.state.website
    loginParamsToSend.institution = this.state.institution

    console.log("meh")
    const signupSuccess = await this.signUpUser(loginParamsToSend);
    console.log(signupSuccess)
    if (signupSuccess) {

      toast.success('Sign up successfull, You may now log in.', {
        position: "top-right",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    }
        this.setState(
      {
        captchaToken: ""
      }
    )
  }


  setUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  setFullName(event) {
    this.setState({
      fullname: event.target.value,
    });
  }

  setBio(event) {
    this.setState({
      bio: event.target.value,
    });
  }

  setInstitution(event) {
    this.setState({
      institution: event.target.value,
    });
  }

  setWebsite(event) {
    this.setState({
      website: event.target.value,
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
        <ToastContainer />
        <HeaderTop state={this.props.state} />

        <div className="login_container">
          <div className="logo_container">
            {OpenDropLogo()}
            <br></br>
            OpenDrop
          </div>

          <input id="signin" type="radio" name="tab" />
          <input id="register" type="radio" name="tab"/>
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
                <div className="input">
                  <input type="submit" value="LOG IN" />
                </div>
              </form>
            </div>
            <div className="page signup">
              <form onSubmit={this.handleSignupSubmit.bind(this)}>
                <div className="input">
                  <div className="title"> Username (mandatory)</div>
                  <input className="text" type="text" placeholder="" value={this.state.username} onChange={this.setUsername.bind(this)} />
                </div>
                <div className="input">
                  <div className="title"> Password (mandatory)</div>
                  <input className="text" type="password" placeholder="" value={this.state.password} onChange={this.setPassword.bind(this)} />
                </div>
                <div className="input">
                  <div className="title"> e-mail (mandatory)</div>
                  <input className="text" type="text" placeholder="" value={this.state.email} onChange={this.setEmail.bind(this)} />
                </div>
                <div className="input">
                  <div className="title"> Full Name </div>
                  <input className="text" type="text" placeholder="" value={this.state.fullname} onChange={this.setFullName.bind(this)} />
                </div>
                <div className="input">
                  <div className="title"> Institution </div>
                  <input className="text" type="text" placeholder="" value={this.state.institution} onChange={this.setInstitution.bind(this)} />
                </div>
                <div className="input">
                  <div className="title"> Website </div>
                  <input className="text" type="text" placeholder="" value={this.state.website} onChange={this.setWebsite.bind(this)} />
                </div>
                <div className="input">
                  <div className="title"> Biography / Misc</div>
                  <input className="text" type="textarea" placeholder="" value={this.state.bio} onChange={this.setBio.bind(this)} />
                </div>
                <br />
                <HCaptcha 
                  sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY} 
                  onVerify={this.onVerifyCaptcha.bind(this)}
                  ref={this.captchaObjSignup}  
                  />
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
