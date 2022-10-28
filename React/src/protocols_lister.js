import * as React from "react"
import './protocol_lister.scss';

class ProtocolsLister extends React.Component {

  constructor(props) {
    super(props);
    //console.log(this.props)
    this.state = {
      a: "b"
    }
  }
  renderSingleProtocol(protocol_id){
    return (
           <li onClick={this.props.state.loadProtocol}>
            <div class="protocol_text">
              <div class="protocol_title">
                The protocol Title
              </div>
              This protocol enables you to interract with lorem ipsum dolores sin amet es you to interract with lorem ipsum dolores sin amet
            </div>
            <div class="protocol_meta">
              Frames : 56<br/>
              Duration : 450 ms <br/>
              By : Author <br/>
            </div>
          </li>
    )
  }

  render() {
    return (
      <React.Fragment>
        Sequence Library
        <ul>
          {this.renderSingleProtocol(23)}
          {this.renderSingleProtocol(23)}
          {this.renderSingleProtocol(23)}
        </ul>
      </React.Fragment>
    )
  }
}
export default ProtocolsLister
