import * as React from "react"
import './side_buttons.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus ,faCopy,faTrash, faBomb, faEraser,faPause} from '@fortawesome/free-solid-svg-icons'

class SideButtons extends React.PureComponent {

  constructor(props) {
    super(props);
    //console.log(this.props)
    this.state = {
      a: "b"
    }
  }

  render() {
    console.log("RENDER SIDE BUTTONS")
    return (
      <React.Fragment>
        <div className="side_buttons_container">
        Commands
        <br/>
        <button className="side_btn" onClick={this.props.duplicateFrame} >
        <div className="side_icon">
        <FontAwesomeIcon icon={faCopy} />
        </div>
        <div className="side_button_text">
          Duplicate frame
        </div>
          </button>
        <br/>
        <button className="side_btn" onClick={this.props.insertBlankFrame} >
        <div className="side_icon">
        <FontAwesomeIcon icon={faCirclePlus} /> 
        </div>
        <div className="side_button_text">
          Insert frame
          </div>
          </button >
        <br/>
        <button className="side_btn" onClick={this.props.clearFrame} >
        <div className="side_icon">
                  <FontAwesomeIcon icon={faEraser} />
                  </div>
                  <div className="side_button_text">
          Clear frame
          </div>
          </button>
        <br/>
        <button className="side_btn" onClick={this.props.deleteFrame}  disabled={this.props.framesAmount > 2 ? false : true}>
        <div className="side_icon">
        <FontAwesomeIcon icon={faTrash} />
        </div>
        <div className="side_button_text">
          Delete frame
          </div>
          </button>
        <br/>
        <button className="side_btn" onClick={this.props.clearAllFrames} >
        <div className="side_icon">
        <FontAwesomeIcon icon={faBomb} />
        </div>
        <div className="side_button_text">
          Delete all frames
          </div>
          </button>
        <br/>

        </div>
      </React.Fragment>
    )
  }
}
export default SideButtons
