import * as React from "react"
import './protocol_lister.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faCreativeCommons } from '@fortawesome/free-brands-svg-icons'
import { formatDuration } from "./utils";


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
    if (!this.props.loggedIn) {
      return
    }

  }

  componentWillUnmount() {
    //TO-DO
  }


  renderLicense(publicness)
  { 
    if (publicness) {
    return <FontAwesomeIcon alt="Public Protocol (Creative Common)" icon={faCreativeCommons}></FontAwesomeIcon>
    } else {
      return 
    }
  }

  formatDescription(description) {
    if (description.length > 200) {
      return description.substring(0, 200)+ " [...]"
    }
    return description
  }

  renderSingleProtocol(protocol, loadedProtocolID) {
    var authorsList = ""
    for (var i = 0; i < Object.keys(protocol.author_list).length; i++) {
      authorsList += protocol.author_list[i].author + ' '
    }
    return (
      <li className={protocol.id === loadedProtocolID ? "loaded_protocol" : ""} key={protocol.id}>
        <div className="protocol_text">
          <div className="protocol_title">
            {protocol.name}
          </div>
          <div className="protocol_buttons">
            <button title="Load protocol" className="lister_btn" onClick={() => this.props.protocolLoadClick(protocol.id)}>
              {/* onClick={props.onClick}> */}
              <FontAwesomeIcon icon={faCloudArrowDown} />
            </button>

            <button title="Delete protocol" className="lister_btn" onClick={() => this.props.protocolDeleteClick(protocol.id, protocol.name)} >
              {/* onClick={props.onClick}> */}
              <FontAwesomeIcon icon={faTrashCan} />
            </button>

          </div>
          <div className="protocol_desc">
            {this.formatDescription(protocol.description)}
          </div>
        </div>
        <div className="protocol_meta">
          Frames : {protocol.frame_count}<br />
          Duration : {formatDuration(protocol.total_duration)} <br />
          By : {authorsList} <br />
        </div>
        <div className="protocol_license">
             {this.renderLicense(protocol.public)} 
        </div>
      </li>
    )
  }

  renderSinglePublicProtocol(protocol, loadedProtocolID) {
    var authorsList = ""
    if (protocol === undefined) {
      return
    }
    for (var i = 0; i < Object.keys(protocol.author_list).length; i++) {
      authorsList += protocol.author_list[i].author + ' '
    }
    return (
      <li className={protocol.id === loadedProtocolID ? "public_protocol public_loaded_protocol" : "public_protocol"} key={protocol.id}>
        <div className="protocol_text">
          <div className="public_protocol_title">
            {protocol.name}
          </div>
          <div className="protocol_buttons">
            <button title="Load protocol" className="public_lister_btn" onClick={() => this.props.publicProtocolLoadClick(protocol.id)}>
              {/* onClick={props.onClick}> */}
              <FontAwesomeIcon icon={faCloudArrowDown} />
            </button>

          </div>
          <div className="protocol_desc">
            {this.formatDescription(protocol.description)}
          </div>
        </div>
        <div className="public_protocol_meta">
          Frames : {protocol.frame_count}<br />
          Duration : {formatDuration(protocol.total_duration)} <br />
          By : {authorsList} <br />
        </div>
        <div className="protocol_license">
              <FontAwesomeIcon icon={faCreativeCommons} />
        </div>
      </li>
    )
  }

  renderProtocolsList() {
    console.log("PROTOCOL LIST RENDER")

    let protocolsList = [];
    if (this.props.protocols === undefined) {
      return
    }
    if (this.props.protocols === null || Object.keys(this.props.protocols).length === 0) {
      return (
        <React.Fragment>
          <br />
          You don't have any protocol yet
        </React.Fragment>
      )
    }
    for (var i = 0; i < Object.keys(this.props.protocols).length; i++) {
      var currentProtocol = this.props.protocols[i]
      protocolsList.push(this.renderSingleProtocol(currentProtocol, this.props.loadedProtocolID))
    }

    return (
      <ul className="user_protocols">
        {protocolsList}
      </ul>
    )
  }

  renderPublicProtocolsList() {
    console.log("PROTOCOL LIST RENDER")
    console.log(this.props.publicProtocols)

    let protocolsList = [];
    console.log("PUBLIC PROTOCOLS:")
    console.log(this.props.publicProtocols)
    if (this.props.publicProtocols === undefined) {
      return
    }
    if (this.props.publicProtocols === null || Object.keys(this.props.publicProtocols).length === 0) {
      return (
        <React.Fragment>
          <br />
          You don't have any protocol yet
        </React.Fragment>
      )
    }
    for (var i = 0; i < Object.keys(this.props.publicProtocols).length; i++) {
      var currentProtocol = this.props.publicProtocols[i]
      protocolsList.push(this.renderSinglePublicProtocol(currentProtocol, this.props.loadedProtocolID))
    }

    return (
      <ul>
        {protocolsList}
      </ul>
    )
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <React.Fragment>
          <div className="lister_container">
            <div className="your_protocols_container">
              Your Protocols
              <div className="your_protocols">
                You have to be logged in to see your protocols
              </div>
            </div>


            <div className="public_protocols_container">
              Public Protocols
              <div className="public_protocols">
                {this.renderPublicProtocolsList()}
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <div className="lister_container">
          <div className="your_protocols_container">
            Your Protocols
              <div className="your_protocols">
                {this.renderProtocolsList()}
              </div>
          </div>


          <div className="public_protocols_container">
            Public Protocols
            <div className="public_protocols">
              {this.renderPublicProtocolsList()}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default ProtocolsLister
