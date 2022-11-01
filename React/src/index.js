import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './bootstrap.scss';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import AdaptorComponent from './adaptor';
import { Range, getTrackBackground } from "react-range";
import GridLayout from "react-grid-layout";
//import Preferences from './Preferences';
import LoginForm from './login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderTop from './header';
import ProtocolsLister from './protocols_lister';
import SideButtons from './side_buttons';
import EditorButtons from './editor_buttons';



class Body extends React.Component {
  constructor(props) {
    super(props);


    let new_frames = [];

    const frame = {
      duration: 0,
      electrodes: []
    };

    var framesAmountSet = 20;

    for (var i = 0; i <= framesAmountSet; i++) {

      var new_frame = Object.create(frame);
      new_frame.duration = 1000;
      new_frame.electrodes = Array(16).fill(Array(8).fill(null));
      new_frames.push(new_frame)
    }

    ////console.log(new_frames)

    this.state = {
      currently_edited_frame: [0],
      frames: new_frames,
      //squares: Array(16).fill(Array(8).fill("o")),
      //electrodes: Array(128).fill(null),
      instanciatedHooks: false,
      serialPort: null,
      clickHandle: this.handleHover.bind(this),
      loggedInCallback: this.loggedInCallback.bind(this),
      logOut: this.logOut.bind(this),
      loadProtocol: this.loadProtocol.bind(this),
      setEditedFrame: this.setEditedFrame.bind(this),
      setSerialPort: this.setSerialPort.bind(this),
      serialSendClick: this.serialSendClick.bind(this),
      goToNextFrame: this.goToNextFrame.bind(this),
      goToPreviousFrame: this.goToPreviousFrame.bind(this),
      framesAmount: framesAmountSet,
      username: "oh",
      loggedIn: false,
      accessToken: null,
    };

    //retreive logged in infos
    var atoken = localStorage.getItem('token')
    var ausername = localStorage.getItem('username')
    console.log("TOKEN SET:")
    console.log(atoken)
    console.log(ausername)
    if (atoken != null && ausername != null) {
      this.state.loggedIn = true
      this.state.username = ausername
      this.state.accessToken = JSON.parse(atoken)
    }
  }

  goToPreviousFrame() {
    if (this.state.currently_edited_frame[0] != 0) {
      this.setState({
        currently_edited_frame: [this.state.currently_edited_frame[0] - 1],
      })
    }
  }

  goToNextFrame() {
    if (this.state.currently_edited_frame[0] != this.state.framesAmount) {
      this.setState({
        currently_edited_frame: [this.state.currently_edited_frame[0] + 1],
      })
    }
  }

  setEditedFrame(frame_id) {
    console.log("SET EDITED FRAME CALL")
    this.setState({
      currently_edited_frame: frame_id,
    })
  }

  setSerialPort(port_id) {
    this.setState({
      serialPort: port_id
    })
  }

  async SendSerialData(data) {

    const writer = this.state.serialPort.writable.getWriter();
    await writer.write(data);
    writer.releaseLock();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async serialSendClick() {
    //console.log("SEND CLICKED")

    var n = this.state.framesAmount

    //send first frame
        let data = this.squaresToBytes(this.state.frames[this.state.currently_edited_frame[0]].electrodes)
        this.SendSerialData(data) 

    await this.sleep(this.state.frames[this.state.currently_edited_frame[0]].duration);

    //loop through frames
    for (let i = 0; i < n; i++) {

      //var oldNb = this.state.currently_edited_frame[0]
      var newNb = this.state.currently_edited_frame[0] + 1
      if (i === this.state.framesAmount) {
        //remove this break for infinite loop
        break;
      }
      let data = this.squaresToBytes(this.state.frames[newNb].electrodes)
      this.setState(
        {
          currently_edited_frame: [newNb]
        }, () => {
          this.SendSerialData(data);
        }
      )

      await this.sleep(this.state.frames[newNb].duration);

    }
    //let data = this.squaresToBytes(this.state.frames[this.state.currently_edited_frame[0]])
    //await writer.write(data);
    //writer.releaseLock();
  }

  loggedInCallback(username, token) {
    console.log("LOGGED IN CALLBACK")
    console.log(username)
    console.log(token)
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('username', username);
    this.setState({
      loggedIn: true,
      username: username,
      accessToken: token,
    })
  }

  logOut() {
    console.log("LOG OUT CALL")
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({
      loggedIn: false,
      username: "",
      accessToken: null,
    })
  }

  loadProtocol(protocol_id) {
    console.log("LOAD PROTOCOL CALL")
    console.log(protocol_id)
  }

  bit_set(num, bit) {
    return num | (1 << bit);
  }

  dec2bin(dec) {
    return (dec >>> 0).toString(2);
  }

  squaresToBytes(squares) {
    let output = new Uint8Array(32);

    for (let i = 0; i < 16; i++) {
      let byte = 0
      for (let j = 0; j < 8; j++) {
        if (squares[j][i] != null) {
          byte = this.bit_set(byte, j)
        }
        output[i] = byte
        ////console.log(i,j)
      }
      //console.log(this.dec2bin(byte))
      // output.push(this.renderSquare(i,j));
    }
    //console.log(output)
    return output
  }

  handleHover(electrode_id, e) {
    //console.log("MOUSE ENTER")
    ////console.log(e)
    if (e.type === "click" || e.buttons === 1 || e.buttons === 3) {
      var newArray = this.state.frames[this.state.currently_edited_frame[0]].electrodes.map(function (arr) {
        return arr.slice();
      });

      //convert electrode id to i/j coordinates:
      var j = Math.floor(electrode_id / 8);
      var i = electrode_id % 8;

      if (newArray[i][j] != null) {
        newArray[i][j] = null;
      } else {
        newArray[i][j] = '1';
      }
      ////console.log(i, j)

      var newFrames = this.state.frames.map(function (arr) {
        //return arr.slice();
        return { ...arr }
      });
      newFrames[this.state.currently_edited_frame[0]].electrodes = newArray

      this.setState({
        frames: newFrames,
      });
    }
    ////console.log(this.state.squares)
  }

  handleDurationChange(event) {

    var newFrames = this.state.frames.map(function (arr) {
      //return arr.slice();
      return { ...arr }
    });
    newFrames[this.state.currently_edited_frame[0]].duration = event.target.value

    this.setState({
      frames: newFrames,
    });
  }

  handleFrameAmountChange(event) {

    const frame = {
      duration: 0,
      electrodes: []
    };

    var newFrames = this.state.frames.map(function (arr) {
      //return arr.slice();
      return { ...arr }
    });

    var framesAmountSet = 0;
    if (this.state.framesAmount < event.target.value) {
      framesAmountSet = event.target.value - this.state.framesAmount

      //console.log("FRAME AMOUNT TO ADD:")
      //console.log(framesAmountSet)

      for (var i = 0; i <= framesAmountSet; i++) {
        var new_frame = Object.create(frame);
        new_frame.duration = 1000;
        new_frame.electrodes = Array(16).fill(Array(8).fill(null));
        newFrames.push(new_frame)
      }
    }
    //TODO: handle case where new amount of frames is lower

    //console.log("NEW FRAMES:")
    //console.log(newFrames)
    this.setState({
      currently_edited_frame: [0],
      frames: newFrames,
      framesAmount: event.target.value,
    });
  }

  renderDurationInput() {
    return (
      <form >
        <label>
          Current Frame Duration (ms):
          <input type="number" value={this.state.frames[this.state.currently_edited_frame[0]].duration} onChange={this.handleDurationChange.bind(this)} />
        </label>
        <label>
          Total amount of frames:
          <input type="number" value={this.state.framesAmount} onChange={this.handleFrameAmountChange.bind(this)} />
        </label>
      </form>
    )
  }

  renderMain() {
    return (
      <React.Fragment>
        <HeaderTop state={this.state} />
        {/* <div class ="mn" > */}
        <GridLayout className="layout" cols={16} rowHeight={30} width={1200} draggableCancel=".not_draggable" compactType="horizontal">
          <div key="b" data-grid={{ x: 0, y: 0, w: 9, h: 6, minW: 2, maxW: 10, minH: 4 }} className="not_draggable">
            <AdaptorComponent state={this.state} />
            <EditorButtons state={this.state} />
            {/* {this.FrameSelector()} */}
            {this.renderDurationInput()}
          </div>

          <div key="d" data-grid={{ x: 4, y: 0, w: 6, h: 4, minW: 6, maxW: 10, minH: 4 }}>
            <SideButtons state={this.state} />
          </div>

          <div key="c" data-grid={{ x: 4, y: 5, w: 6, h: 6, minW: 6, maxW: 10, minH: 4 }}>
            <ProtocolsLister state={this.state} />
          </div>
        </GridLayout>
      </React.Fragment>
    )
  }

  render() {

    return (
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={this.renderMain()} />
            <Route path="/login" element={<LoginForm state={this.state} />} />
            {/* <Route path="/preferences" element={<Preferences />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<Game />);
root.render(
  <Body />
);
