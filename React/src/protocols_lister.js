import * as React from "react"
import './protocol_lister.scss';
import { GenerateAuthHeader } from "./utils";


class ProtocolsLister extends React.PureComponent {

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
  if (!this.props.loggedIn){
    return
  }
   
  }

componentWillUnmount() {
    //TO-DO
}



  renderSingleProtocol(protocol){
    var authorsList = ""
    for (var i = 0; i < Object.keys(protocol.author_list).length; i++)
    {
      authorsList += protocol.author_list[i].author + ' '
    }
    return (
           <li onClick={() => this.props.protocolClick(protocol.id)}>
            <div className="protocol_text">
              <div className="protocol_title">
                {protocol.name}
              </div>
                {protocol.description}
            </div>
            <div className="protocol_meta">
              Frames : {protocol.frame_count}<br/>
              Duration : {protocol.total_duration} ms <br/>
              By : {authorsList} <br/>
            </div>
          </li>
    )
  }

  renderProtocolsList(){
    console.log("PROTOCOL LIST RENDER")

    let protocolsList=[];
    if ( this.props.protocols === undefined ) {
      return 
    }
    if (this.props.protocols === null || Object.keys(this.props.protocols).length === 0 )
    {
    return (
      <React.Fragment>
       <br/>
        You don't have any protocol yet
      </React.Fragment>
    )
    }
    for (var i = 0; i < Object.keys(this.props.protocols).length; i++) {
      var currentProtocol = this.props.protocols[i]
      protocolsList.push(this.renderSingleProtocol(currentProtocol))
    }

    return (
      <ul>
        {protocolsList}
      </ul>
    )
  }

  render() {
    if (!this.props.loggedIn) 
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
