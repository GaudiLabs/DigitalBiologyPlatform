import * as React from "react"
import './protocol_lister.scss';
import { GenerateAuthHeader } from "./utils";


class ProtocolsLister extends React.Component {

  constructor(props) {
    super(props);
    //console.log(this.props)
    this.state = {
      a: "b",
      error: false,
      errorMessage: ""
    }
  }



 async componentDidMount() {
    let BackendProtocolsResponse = await this.retreiveUserProtocols()
    this.setState(
      {
        protocols : BackendProtocolsResponse.protocols
      }
    )
  }

componentWillUnmount() {
    //TO-DO
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
          error : true,
          errorMessage : "Invalid Authentication, try re-loging in ?",
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

  async retreiveUserProtocols(state) {

    let requestResp
    const route = "/protocol/me"
    const api_url = process.env.REACT_APP_API_URL

    try {
      requestResp = await fetch(api_url + route, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GenerateAuthHeader(this.props.state.username, this.props.state.accessToken) 
      },
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
    //console.log(requestResp.json())
    return requestResp.json()
    }
 }

  renderSingleProtocol(protocol){
    var authorsList = ""
    for (var i = 0; i < Object.keys(protocol.author_list).length; i++)
    {
      authorsList += protocol.author_list[i].author + ' '
    }
    return (
           <li onClick={this.props.state.loadProtocol}>
            <div class="protocol_text">
              <div class="protocol_title">
                {protocol.name}
              </div>

                {protocol.description}
                LoremIpsum dolores sin amet
            </div>
            <div class="protocol_meta">
              Frames : {protocol.frame_count}<br/>
              Duration : {protocol.total_duration} ms <br/>
              By : {authorsList} <br/>
            </div>
          </li>
    )
  }

  renderProtocolsList(){

    let protocolsList=[];
    console.log("here")
    console.log(this.state)
    if ( this.state.protocols == undefined ) {
      return 
    }
    if (this.state.protocols === null || Object.keys(this.state.protocols).length == 0 )
    {
    return (
        "You don't have any protocol yet"
    )
    }
    for (var i = 0; i < Object.keys(this.state.protocols).length; i++) {
      var currentProtocol = this.state.protocols[i]
      protocolsList.push(this.renderSingleProtocol(currentProtocol))
    }

    return (
      <ul>
        {protocolsList}
      </ul>
    )
  }

  render() {
    if (!this.props.state.loggedIn) 
    {
     return (
      <React.Fragment>
        Sequence Library
        <br/>
        You have to be logged in to see your protocols
      </React.Fragment>
    )     
    }

    return (
      <React.Fragment>
        Sequence Library
        {this.renderProtocolsList()}
      </React.Fragment>
    )
  }
}
export default ProtocolsLister
