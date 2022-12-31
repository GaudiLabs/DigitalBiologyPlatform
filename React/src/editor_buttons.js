import * as React from "react"
import './editor_buttons.scss';
import { Range, getTrackBackground } from "react-range";
import { ArrowLeft, ArrowRight, ConnectPictoVoid, ConnectPictoConnected, SwitchTheme } from "./graphics";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCircle, faCircleArrowLeft, faCircleDot, faCog, faExpand, faFloppyDisk, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from "@mui/material/styles";


function SelectSerial(props) {
  if (props.state.serialPort === null) {
    return (
      <button title="Connect to device" className="editor_btn" onClick={props.onClick}>
        {ConnectPictoVoid()}
        {/* {ConnectPictoConnected()} */}
      </button>
    );
  }

  return (
    <button title="Connect to device" className="editor_btn" onClick={props.onClick}>
      {/* {ConnectPictoVoid()} */}
      {ConnectPictoConnected()}
    </button>
  );
}

function Send(props) {

  // if (props.state.liveMode === true) {
  //   return (
  //     <button disabled title="Play Sequence" className="editor_btn" onClick={props.onClick}>
  //       <FontAwesomeIcon icon={faPlay} />
  //     </button>
  //   )
  // }

  if (props.state.playing) {
    return (
      <button  title="Pause Sequence" className="editor_btn" onClick={props.onClick}>
        <FontAwesomeIcon icon={faPause} />
      </button>
    );
  }
  return (
    <button title="Play Sequence" className="editor_btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faPlay} />
    </button>
  );
}

function PreviousFrame(props) {
  return (
    <button title="Previous frame" className="editor_btn start_btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
}

function NextFrame(props) {
  return (
    <button title="Next frame" className="editor_btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
  );
}

function Settings(props) {
  return (
    <button title="Protocol settings" className="editor_btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faCog} />
    </button>
  );
}

function Enlarge(props) {
  return (
    <button title="Enlarge Adaptor" className="editor_btn" onClick={props.onClick}>
      <FontAwesomeIcon icon={faExpand} />
    </button>
  );
}
function Save(props) {
  if (props.state.liveMode === true) {
    return (
      <button disabled title="Save" className="editor_btn end_btn" onClick={props.onClick}>
        <FontAwesomeIcon icon={faFloppyDisk} />
      </button>
    );
  } else {
    return (
      <React.Fragment>
        <button title="Save" className="editor_btn end_btn" onClick={props.onClick}>
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
      </React.Fragment>
    );
  }
}

function Live(props) {

  if (props.state.liveMode === true) {
    return (
      <button title="Live Mode" className="editor_btn active_live_btn" onClick={props.onClick}>
        <FontAwesomeIcon icon={faCircle} />
      </button>
    )
  } else {
    return (
      <button disabled={props.state.serialPort === null} title="Live Mode" className="editor_btn" onClick={props.onClick}>
        <FontAwesomeIcon icon={faCircle} />
      </button>
    )
  }

}


class EditorButtons extends React.Component {

  constructor(props) {
    super(props);
    //console.log(this.props)
    this.state = {
      settingsOpen: false
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

  ToggleSettingsClick() {
    this.setState({
      settingsOpen : !this.state.settingsOpen
    })
  }



  render() {

    return (
      <React.Fragment>
        <div className="range_container">
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
                      max: this.props.state.framesAmount - 1
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
        <div className="buttons_container">
          <PreviousFrame onClick={() => this.props.state.goToPreviousFrame()} />
          <Send state={this.props.state} onClick={() => this.props.state.serialSendClick()} />
          <NextFrame onClick={() => this.props.state.goToNextFrame()} />
          <SelectSerial state={this.props.state} onClick={() => this.SelectSerialClick()} />
          <Settings onClick={() => this.ToggleSettingsClick()} />
          <Enlarge onClick={() => this.SelectSerialClick()} />
          <Live state={this.props.state} onClick={() => this.props.state.liveModeTrigger()} />
          <Save state={this.props.state} onClick={() => this.props.state.saveClick()} />
        </div>
        <div className="settings_container" style={{display: this.state.settingsOpen ? 'block' : 'none' }}>
          Settings
          <br/>
          <br/>
          <ThemeProvider theme={SwitchTheme}>
            <Switch 
            //defaultChecked 
              size="small" 
            checked={this.props.state.loopMode}
              onChange={this.props.state.toggleLoopMode}
            /> Loop Mode
          </ThemeProvider>
          <br/>
          <br/>
          <form>
          <label htmlFor="frame_amount">
          Total amount of frames
        </label>
        <input className="control_input" name="frame_amount" type="number" value={this.props.state.framesAmount} onChange={this.props.state.handleFrameAmountChange} />
        <br/>
        <label htmlFor="default_duration">
          Default new frame duration
        </label>
        <input className="control_input" name="default_duration" type="number" value={this.props.state.defaultDuration} onChange={this.props.state.setDefaultFrameDuration} />
      </form>
          <br/>
          <br/>
        </div>
      </React.Fragment>
    )
  }
}
export default EditorButtons
