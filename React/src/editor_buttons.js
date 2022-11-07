import * as React from "react"
import './editor_buttons.scss';
import { Range, getTrackBackground } from "react-range";
import {ArrowLeft, ArrowRight } from "./graphics";


function SelectSerial(props) {
  return (
    <button className="btn" onClick={props.onClick}>
      Select serial port & connect
    </button>
  );
}

function Send(props) {
  return (
    <button className="btn" onClick={props.onClick}>
      Send
    </button>
  );
}

function PreviousFrame(props) {
  return (
    <button className="btn" onClick={props.onClick}>
      {ArrowLeft()}
    </button>
  );
}

function NextFrame(props) {
  return (
    <button className="btn" onClick={props.onClick}>
      {ArrowRight()}
    </button>
  );
}

function Settings(props) {
  return (
    <button className="btn" onClick={props.onClick}>
      Settings
    </button>
  );
}

function Enlarge(props) {
  return (
    <button className="btn" onClick={props.onClick}>
      Big
    </button>
  );
}
function Save(props) {
  return (
    <button className="btn" onClick={props.onClick}>
      Save
    </button>
  );
}


class EditorButtons extends React.Component {

  constructor(props) {
    super(props);
    //console.log(this.props)
    this.state = {
      a: "b"
    }
  }

  async SelectSerialClick() {
    //console.log("CONNECT CLICKED")
    //this.setLogginToggle(true)
    //console.log("USERNAME :")
    //console.log(this.props.state.username)
    //if ("serial" in navigator) {
    //    //console.log("The serial port is supported.")
    // The Web Serial API is supported.
    //} else {
    //TODO :
    //Propoer error message ?
    //    alert("This web browser is not compatible with serial API")
    //}
    const port = await navigator.serial.requestPort();
    this.props.state.setSerialPort(port)
    /*
    this.setState({
      serialPort: port
    })
    */
    await port.open({ baudRate: 115200 });
    //console.log("serial connected successfully.")
  }

  render(){

    return (
        <React.Fragment>
                        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "5%"
          }}
        >
              <Range
            values={this.props.state.currently_edited_frame}
            step={1}
            min={0}
            max={this.props.state.framesAmount - 1}
            onChange={(value) => {
              //console.log("ici")
              //console.log(value)
              this.props.state.setEditedFrame(value)
          }}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "36px",
                  display: "flex",
                  width: "100%"
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: this.props.state.currently_edited_frame,
                      colors: ["#548BF4", "#ccc"],
                      min: 0,
                      max: this.props.state.framesAmount
                    }),
                    alignSelf: "center"
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "100%",
                  width: "10%",
                  borderRadius: "4px",
                  backgroundColor: "#FFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 2px 6px #AAA"
                }}
              >
                {this.props.state.currently_edited_frame[0]}
              </div> 
  
            )}
          />
              </div> 
          <PreviousFrame onClick={() => this.props.state.goToPreviousFrame()} />
          <Send onClick={() => this.props.state.serialSendClick()} />
          <NextFrame onClick={() => this.props.state.goToNextFrame()} />
          <SelectSerial onClick={() => this.SelectSerialClick()} />
          <Settings onClick={() => this.SelectSerialClick()} />
          <Enlarge onClick={() => this.SelectSerialClick()} />
          <Save onClick={() => this.SelectSerialClick()} />
        </React.Fragment>
  )
  }
}
export default EditorButtons
