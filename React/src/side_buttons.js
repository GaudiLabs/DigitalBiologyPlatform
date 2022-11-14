import * as React from "react"
import './side_buttons.scss';

class SideButtons extends React.Component {

  constructor(props) {
    super(props);
    //console.log(this.props)
    this.state = {
      a: "b"
    }
  }

  render() {
    return (
      <React.Fragment>
        Commands
        <br/>
        <button className="side_btn">Copy Last Frame</button>
        <br/>
        <button className="side_btn">Clear Frame</button>
        <br/>
      </React.Fragment>
    )
  }
}
export default SideButtons
