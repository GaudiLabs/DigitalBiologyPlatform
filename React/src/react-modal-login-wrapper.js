import React, { useState } from "react";
import ReactModalLogin from "react-modal-login";

import "./react-modal-login-custom.css";

class LoginPrompt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        showModal: props.state.GetlogginToggle(),
        loggedIn: null,
        loading: false,
        error: null,
        initialTab: null,
        recoverPasswordSuccess: null,
        closeModal : this.closeModal.bind(this)
      };
    }

    onLogin (e, a, c) {
  
      console.log(e, a, c);
      console.log("onLogin()");
      console.log("email: " + document.querySelector("#email").value);
      console.log("password: " + document.querySelector("#password").value);
  
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      //this.props.state.loggedInHandler("testuser","token1546")
  
      if (!email || !password) {
        this.setState({
          error: true,
        });
      } else {
        this.onLoginSuccess("form", "mouao");
      }
    }
  
    onRegister() {
      console.log("onRegister()");
      console.log("login: " + document.querySelector("#login").value);
      console.log("email: " + document.querySelector("#email").value);
      console.log("password: " + document.querySelector("#password").value);
  
      const login = document.querySelector("#login").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
  
      if (!login || !email || !password) {
        this.setState({
          error: true,
        });
      } else {
        this.onLoginSuccess("form", "mouais");
      }
    }
  
    onRecoverPassword() {
      console.log("onRecoverPassword()");
      console.log("email: " + document.querySelector("#email").value);
  
      const email = document.querySelector("#email").value;
  
      if (!email) {
        this.setState({
          error: true,
          recoverPasswordSuccess: false,
        });
      } else {
        this.setState({
          error: null,
          recoverPasswordSuccess: true,
        });
      }
    }
  
    openModal(initialTab) {
      console.log("openModal()");
  
      this.setState({
        initialTab: initialTab,
        showModal: true,
      });
    }
  
    onLoginSuccess (method, response) {
      console.log("onLoginSuccess()");
  
      this.setState({
        showModal: false,
        error: null,
        loggedIn: method,
        loading: false,
      });
    }
  
    onLoginFail (method, response)  {
      console.log("onLoginFail()");
      this.setState({
        loading: false,
        error: response,
      });
    }
  
    startLoading ()  {
      console.log("startLoading()");
      this.setState({
        loading: true,
      });
    }
  
    finishLoading ()  {
      console.log("finishLoading()");
      this.setState({
        loading: false,
      });
    }
  
    afterTabsChange ()  {
      console.log("afterTabsChange()");
  
      this.setState({
        error: null,
        recoverPasswordSuccess: false,
      });
    }
  
    closeModal  ()  {
      console.log('closeModal()');
      this.setState({
        showModal: false,
        error: null,
        loading: false,
      });
    }

  render() {
    return (
    <div>
      <button className="RML-btn" onClick={() => this.openModal("login")}>
        Login
      </button>

      <ReactModalLogin
        visible={this.state.showModal}
        onCloseModal={this.state.closeModal}
        loading={this.isLoading}
        initialTab={this.state.initialTab}
        error={this.state.error}
        tabs={{
          afterChange: this.afterTabsChange,
        }}
        startLoading={this.startLoading}
        finishLoading={this.finishLoading}
        form={{
          onLogin: this.onLogin,
          onRegister: this.onRegister,
          onRecoverPassword: this.onRecoverPassword,

          recoverPasswordSuccessLabel: this.state.recoverPasswordSuccess
            ? {
                label: "New password has been sent to your mailbox!",
              }
            : null,
          recoverPasswordAnchor: {
            label: "Forgot your password?",
          },
          loginBtn: {
            label: "Sign in",
          },
          registerBtn: {
            label: "Sign up",
          },
          recoverPasswordBtn: {
            label: "Send new password",
          },
          loginInputs: [
            {
              containerClass: "RML-form-group",
              label: "Email",
              type: "email",
              inputClass: "RML-form-control",
              id: "email",
              name: "email",
              placeholder: "Email",
            },
            {
              containerClass: "RML-form-group",
              label: "Password",
              type: "password",
              inputClass: "RML-form-control",
              id: "password",
              name: "password",
              placeholder: "Password",
            },
          ],
          registerInputs: [
            {
              containerClass: "RML-form-group",
              label: "Nickname",
              type: "text",
              inputClass: "RML-form-control",
              id: "login",
              name: "login",
              placeholder: "Nickname",
            },
            {
              containerClass: "RML-form-group",
              label: "Email",
              type: "email",
              inputClass: "RML-form-control",
              id: "email",
              name: "email",
              placeholder: "Email",
            },
            {
              containerClass: "RML-form-group",
              label: "Password",
              type: "password",
              inputClass: "RML-form-control",
              id: "password",
              name: "password",
              placeholder: "Password",
            },
          ],
          recoverPasswordInputs: [
            {
              containerClass: "RML-form-group",
              label: "Email",
              type: "email",
              inputClass: "RML-form-control",
              id: "email",
              name: "email",
              placeholder: "Email",
            },
          ],
        }}
        // separator={{
        //   label: "or",
        // }}
        // providers={{
        //   facebook: {
        //     config: facebookConfig,
        //     onLoginSuccess: onLoginSuccess,
        //     onLoginFail: onLoginFail,
        //     inactive: isLoading,
        //     label: "Continue with Facebook",
        //   },
        //   google: {
        //     config: googleConfig,
        //     onLoginSuccess: onLoginSuccess,
        //     onLoginFail: onLoginFail,
        //     inactive: isLoading,
        //     label: "Continue with Google",
        //   },
        // }}
      />
      {/* {loggedIn} */}
    </div>
    )
  };
}

export default LoginPrompt;
