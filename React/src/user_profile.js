import React from 'react';
import './user_profile.scss';
import OpenDropLogo from './logo';
import { Navigate } from "react-router-dom";
import HeaderTop from './header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

class UserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",

      fullname: "",
      bio: "",
      institution: "",
      website: "",
      public_protocol_amount: 0,
      protocol_amount: 0,
      email: "",

      redirectToHome: false,
    }
  }

  async componentDidMount() {
    console.log("COMPONENT DID MOUNT : User Profile")

    let BackendData = await this.retreivePublicUserData(this.props.username)
    console.log(BackendData)
    if (BackendData != undefined) {
    this.setState(
      {
        fullname: BackendData.fullname,
        bio: BackendData.bio,
        institution: BackendData.institution,
        website: BackendData.website,
        public_protocol_amount: BackendData.public_protocol_amount,
        protocol_amount: BackendData.protocol_amount,
        email: BackendData.email
      }
    )
    }

  }

  async retreivePublicUserData(username) {

    let requestResp
    const route = "/user/" + username
    const api_url = process.env.REACT_APP_API_URL

    try {
      requestResp = await fetch(api_url + route, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    catch (error) {
      this.setState(
        {
          error: true,
          errorMessage: "Unable to reach server"
        }
      )
      console.log(error)
      return
    }
    //No network error, handle regular errors
    if (!this.handleHTTPErrors(requestResp)) {
      //TODO : empty body error case
      //console.log(requestResp.json())
      return requestResp.json()
    }
  }

  handleHTTPErrors(response) {
    console.log("HANDLE LOAD PROTOCOL ERROR TRIGGER")
    console.log(response)
    if (response.ok) {
      return false
    }
      toast.error("Unexpected error happened", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    return true
  }

  render() {
    if (this.state.redirectToHome) {
      return <Navigate to="/" />
    }
    return (
      <React.Fragment>
        <ToastContainer />
        <HeaderTop state={this.props.state} />
        <div className="container mt-5">

          <div className="row d-flex justify-content-center">

            <div className="col-md-7">

              <div className="card p-3 py-4">

                <div className="text-center profile_pic">
                  <FontAwesomeIcon icon={faUser} />
                </div>


                <div className="text-center mt-3">
                  <span>{this.props.username}</span>
                  <h5 className="mt-2 mb-0">{this.state.fullname}</h5>
                  <span>{this.state.institution}</span><br/>
                  <span>{this.state.email}</span><br/>
                  <span><a className="plink" href={this.state.website} target="_blank">{this.state.website}</a></span>

                  <div className="desc">
                    <p className="fonts">{this.state.bio} </p>
                  </div>
                  <div className='stats'>
                    <div className='stat_column'>
                      <div className='stat_title'>
                        Amount of protocols :
                      </div>
                      <div className='stat_value'>
                      {this.state.protocol_amount}
                      </div>
                    </div>
                    <div className='stat_column'>
                      <div className='stat_title'>
                        Amount of public protocols :
                      </div>
                      <div className='stat_value'>
                      {this.state.public_protocol_amount}
                      </div>
                    </div>
                  </div>

                {/* <h6>Public Protocols:</h6> */}

                </div>

              </div>

              {/* <div className='go_back_btn_container'>
              <div className='go_back_btn'>
              <FontAwesomeIcon icon={faArrowLeft} />
              &nbsp;
              <Link to="/">Go back to editor</Link>
              </div>
              </div> */}
            </div>

          </div>

        </div>

      </React.Fragment>
    )
  }
}

export default UserProfile
