import * as React from "react"
import './protocol_lister.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faCloudArrowDown, } from '@fortawesome/free-solid-svg-icons'


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

  renderSingleProtocol(protocol, loadedProtocolID) {
    var authorsList = ""
    for (var i = 0; i < Object.keys(protocol.author_list).length; i++) {
      authorsList += protocol.author_list[i].author + ' '
    }
    return (
      <li className={protocol.id === loadedProtocolID ? "loaded_protocol":""} key={protocol.id}>
        <div className="protocol_text">
          <div className="protocol_title">
            {protocol.name}
          </div>
          <div className="protocol_buttons">
            <button title="Load protocol" className="lister_btn"  onClick={() => this.props.protocolLoadClick(protocol.id)}>
              {/* onClick={props.onClick}> */}
              <FontAwesomeIcon icon={faCloudArrowDown} />
            </button>
 
            <button title="Delete protocol" className="lister_btn" onClick={() => this.props.protocolDeleteClick(protocol.id, protocol.name)} >
              {/* onClick={props.onClick}> */}
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
 
          </div>
          <div className="protocol_desc">
          {protocol.description}
          </div>
        </div>
        <div className="protocol_meta">
          Frames : {protocol.frame_count}<br />
          Duration : {protocol.total_duration} ms <br />
          By : {authorsList} <br />
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
      <ul>
        {protocolsList}
      </ul>
    )
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <React.Fragment>
          Sequence Library
          <br />
          You have to be logged in to see your protocols
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <div className="lister_container">
          Sequence Library
          {this.renderProtocolsList()}
        </div>
      </React.Fragment>
    )
  }
}
export default ProtocolsLister
