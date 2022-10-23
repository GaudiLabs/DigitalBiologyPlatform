import React from 'react';
import './Login.scss';
import OpenDropLogo from './logo';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    }
  }

  componentDidMount() {
    console.log("COMPONENT LOGIN FORM MOUNTED");

    var defaultTab = document.getElementById("signin")
    defaultTab.setAttribute("checked", true)
  }

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  async loginUser(credentials) {
    return fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(this.handleErrors)
      .then(data => data.json())
      .catch(error => console.log(error));
  }

  async handleLoginSubmit(e) {
    e.preventDefault();
    console.log("HANDLE SUBMIT TRIGGER");

    let username = this.state.username;
    let password = this.state.password;
    const token = await this.loginUser({
      username,
      password
    });
    console.log(token)
    //TODO : local store the token
    //sessionStorage.setItem('token', JSON.stringify(token));
    //setToken(token);
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
    return (
      <div className="login_container">
        <div className="logo_container">
          {OpenDropLogo()}
          <br></br>
          OpenDrop
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
    )
  }
}

export default LoginForm
