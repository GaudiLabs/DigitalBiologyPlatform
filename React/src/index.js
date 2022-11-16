import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import './bootstrap.scss';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import AdaptorComponent from './adaptor';
//import GridLayout from "react-grid-layout";
//import Preferences from './Preferences';
import LoginForm from './login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderTop from './header';
import ProtocolsLister from './protocols_lister';
import SideButtons from './side_buttons';
import EditorButtons from './editor_buttons';
import { Responsive, WidthProvider } from "react-grid-layout";
import { GenerateAuthHeader } from "./utils";
import { faUtensilSpoon } from '@fortawesome/free-solid-svg-icons';
const ResponsiveGridLayout = WidthProvider(Responsive);



class Body extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      currently_edited_frame: [0],
      frames: [{
        duration: 0,
        electrodes: Array(16).fill(Array(8).fill(null))
      }
        ,
      {
        duration: 0,
        electrodes: Array(16).fill(Array(8).fill(null))
      }
      ],
      protocolName: "New Protocol",
      protocolDescription: "Protocol description",
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
      saveClick: this.saveClick.bind(this),
      liveModeTrigger: this.liveModeTrigger.bind(this),
      framesAmount: 2,
      liveMode: false,
      username: "oh",
      loggedIn: false,
      accessToken: null,
      playing: false,
      authHeader: ""
    };

    //retreive logged in infos
    var atoken = localStorage.getItem('token')
    var ausername = localStorage.getItem('username')
    console.log("TOKEN SET:")
    console.log(atoken)
    console.log(ausername)
    var tokenObj = JSON.parse(atoken)
    //TODO : here check if token is expired 
    if (atoken != null && ausername != null) {
      this.state.loggedIn = true
      this.state.username = ausername
      this.state.accessToken = tokenObj
      this.state.authHeader = GenerateAuthHeader(ausername, tokenObj)
    }
  }

  async componentDidMount() {
    console.log("COMPONENT DID MOUNT : Main")
    this.allocCleanFrames(20)

    let BackendProtocolsResponse = await this.retreiveUserProtocols()
    this.setState(
      {
        protocols : BackendProtocolsResponse.protocols
      }
    )
  }

  allocCleanFrames(framesAmount) {
    let new_frames = [];

    const frame = {
      duration: 0,
      electrodes: []
    };

    for (var i = 0; i < framesAmount; i++) {

      var new_frame = Object.create(frame);
      new_frame.duration = 1000;
      new_frame.electrodes = Array(16).fill(Array(8).fill(null));
      new_frames.push(new_frame)
    }

    console.log("HERE")
    this.setState({
      frames: new_frames,
      framesAmount: framesAmount
    })
  }

  goToPreviousFrame() {
    if (this.state.currently_edited_frame[0] !== 0) {
      this.setState({
        currently_edited_frame: [this.state.currently_edited_frame[0] - 1],
      }, this.handleLiveDeviceSend)
    }
  }

  goToNextFrame() {
    if (this.state.currently_edited_frame[0] !== this.state.framesAmount) {
      this.setState({
        currently_edited_frame: [this.state.currently_edited_frame[0] + 1],
      }, this.handleLiveDeviceSend)
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
    this.setState(
      {
        playing: !this.state.playing
      },
      () => {
        if (this.state.playing) {
          this.playProtocol()
        }
      }
    )
  }

  async handleLiveDeviceSend() {
    if (this.state.liveMode) {
    let data = this.squaresToBytes(this.state.frames[this.state.currently_edited_frame[0]].electrodes)
    this.SendSerialData(data)
    }
  }

  async playProtocol() {
    var n = this.state.framesAmount

    //send first frame
    let data = this.squaresToBytes(this.state.frames[this.state.currently_edited_frame[0]].electrodes)
    this.SendSerialData(data)

    await this.sleep(this.state.frames[this.state.currently_edited_frame[0]].duration);

    //loop through frames
    console.log(this.state.currently_edited_frame[0])
    for (let i = this.state.currently_edited_frame[0]; i < n - 1; i++) {
      if (!this.state.playing) {
        return
      }

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

      if (newNb != this.state.framesAmount - 1) {
        await this.sleep(this.state.frames[newNb].duration);
      } else {
        //End of frames reached
        break;
      }
    }
    this.setState(
      {
        playing: false
      }
    )
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
      authHeader: GenerateAuthHeader(username, token)
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

  handleHTTPErrors(response) {
    console.log("HANDLE LOAD PROTOCOL ERROR TRIGGER")
    console.log(response)
    if (response.ok) {
      return false
    }
    //401 Unauthorized
    if (response.status === 401) {
      this.setState(
        {
          error: true,
          errorMessage: "Invalid Authentication, try re-loging in ?",
        })
    } else {
      this.setState(
        {
          error: true,
          errorMessage: "Unexpected error happened",
        })
    }
    return true
  }


  async retreiveProtocol(protocolID) {

    let requestResp
    const route = "/protocol/" + protocolID
    const api_url = process.env.REACT_APP_API_URL

    try {
      requestResp = await fetch(api_url + route, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.authHeader
        },
      })
    }
    catch (error) {
      this.setState(
        {
          error: true,
          errorMessage: "Unable to reach server"
        }
      )
      console.log(error)
      return
    }
    //No network error, handle regular errors
    if (!this.handleHTTPErrors(requestResp)) {
      //TODO : empty body error case
      //console.log(requestResp.json())
      return requestResp.json()
    }
  }

  async saveNewProtocol(protocol) {

    let requestResp
    const route = "/protocol/add"
    const api_url = process.env.REACT_APP_API_URL

    try {
      requestResp = await fetch(api_url + route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.authHeader
        },
        body: JSON.stringify(protocol)
      })
    }
    catch (error) {
      this.setState(
        {
          error: true,
          errorMessage: "Unable to reach server"
        }
      )
      console.log(error)
      return
    }
    //No network error, handle regular errors
    if (!this.handleHTTPErrors(requestResp)) {
      //TODO : empty body error case
      //console.log(requestResp.json())
      return requestResp.json()
    }
  }



  loadBackendProtocolToState(backendProtocol) {
    //Parse new amount, default to 0 if NaN
    var newAmount = (parseInt(backendProtocol.frame_count) || 0)

    if (newAmount === 0) {
      this.setState({
        currently_edited_frame: [0],
        framesAmount: newAmount,
      });
      return
    }

    const frame = {
      duration: 0,
      electrodes: []
    };

    var newFrames = Array()


    console.log("NEWAMOUNT:")
    console.log(newAmount)

    //TODO:
    //use clean alloc
    //pushing new frames
    for (var i = 0; i < newAmount; i++) {
      var new_frame = Object.create(frame);
      new_frame.duration = backendProtocol.frames[i].duration;
      new_frame.electrodes = Array(16);
      for (var k = 0; k < 16; k++) {
        new_frame.electrodes[k] = Array(8).fill(null)
      }
      //populating with electrodes
      if (backendProtocol.frames[i].electrodes != null) { 
      for (var j = 0; j < backendProtocol.frames[i].electrodes.length; j++) {
        var electrode_id = parseInt(backendProtocol.frames[i].electrodes[j].electrode_id)
        var y = Math.floor(electrode_id / 8);
        var x = electrode_id % 8;
        new_frame.electrodes[x][y] = backendProtocol.frames[i].electrodes[j].value
      }
    }
      newFrames.push(new_frame)
    }
    this.setState(
      {
        currently_edited_frame: [0],
        frames: newFrames,
        framesAmount: backendProtocol.frame_count,
        protocolName: backendProtocol.name,
        protocolDescription: backendProtocol.description,
      }
    )

  }

  async loadProtocol(protocol_id) {
    console.log("LOAD PROTOCOL CALL")
    console.log(protocol_id)
    let BackendProtocol = await this.retreiveProtocol(protocol_id)
    console.log(BackendProtocol)
    this.loadBackendProtocolToState(BackendProtocol)
  }



  SerializeStateProtocol() {

    const electrode = {
      "value": 0,
      "electrode_id": "placeholder electrode id"
    }

    const frame = {
      rank: 0,
      duration: 0,
      electrodes: []
    };

    const rankedAuthor = {
      "rank": 1,
      "author": "placeholder author"
    }

    const protocol = {
      "name": "Test Protocol",
      "frames": [],
      "device_id": 0,
      "description": "placeholder desc",
      "author_list": [],
    }


    var returnedProtocol = Object.create(protocol)
    returnedProtocol.name = this.state.protocolName
    returnedProtocol.description = this.state.protocolDescription
    //TODO: this must not be harcoded, this is a stub
    returnedProtocol.device_id = 2
    returnedProtocol.frames = []
    returnedProtocol.author_list = []


    var authorToAdd = Object.create(rankedAuthor)
    authorToAdd.rank = 1
    authorToAdd.author = this.state.username
    returnedProtocol.author_list.push(authorToAdd)


    for (var i = 0; i < this.state.framesAmount; i++) {
      console.log("ADDING FRAME")
      var frameToAdd = Object.create(frame)
      frameToAdd.duration = this.state.frames[i].duration
      frameToAdd.rank = i
      frameToAdd.electrodes = []

      //Generate electrodes
      for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 16; y++) {
          if (this.state.frames[i].electrodes[x][y] != null) {
            console.log("DETECTED ELECTRODE")
            //rebuilding electrode
            var electrodeToAdd = Object.create(electrode)
            electrodeToAdd.electrode_id = ((y * 8) + x).toString()
            electrodeToAdd.value = parseInt(this.state.frames[i].electrodes[x][y]) 
            console.log(electrodeToAdd)
            frameToAdd.electrodes.push(electrodeToAdd)
          }
        }
      }
      returnedProtocol.frames.push(frameToAdd)
    }

    console.log(returnedProtocol)
    return returnedProtocol
  }

  async saveClick() {
    console.log("SAVE CLICK TRIGGER")
    //TODO : here add popup, choices etc
    var currentProtocol = this.SerializeStateProtocol()
    await this.saveNewProtocol(currentProtocol)
    let BackendProtocolsResponse = await this.retreiveUserProtocols()
    this.setState(
      {
        protocols : BackendProtocolsResponse.protocols
      }
    )
  }

  liveModeTrigger() {
    console.log("LIVE MODE CLICK TRIGGER")
    this.setState(
      {
        liveMode : !this.state.liveMode
      },
      this.handleLiveDeviceSend
    )

  }


  async retreiveUserProtocols() {

    let requestResp
    const route = "/protocol/me"
    const api_url = process.env.REACT_APP_API_URL

    try {
      requestResp = await fetch(api_url + route, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.authHeader 
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
    if (!this.handleHTTPErrors(requestResp)) {
    //TODO : empty body error case
    //console.log(requestResp.json())
    return requestResp.json()
    }
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
      }, this.handleLiveDeviceSend);
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

  handleNameChange(event) {
    this.setState(
      {
        protocolName: event.target.value
      }
    )
  }

  handleDescriptionChange(event) {
    this.setState(
      {
        protocolDescription: event.target.value
      }
    )
  }


  handleFrameAmountChange(event) {

    //Parse new amount, default to 0 if NaN
    var newAmount = (parseInt(event.target.value) || 0)

    if (newAmount === 0) {
      this.setState({
        currently_edited_frame: [0],
        framesAmount: newAmount,
      });
      return
    }

    const frame = {
      duration: 0,
      electrodes: []
    };

    //copy frames
    var newFrames = this.state.frames.map(function (arr) {
      return { ...arr }
    });


    console.log("NEWAMOUNT:")
    console.log(newAmount)

    var framesAmountSet = 0;
    if (this.state.framesAmount < newAmount) {
      framesAmountSet = newAmount - this.state.framesAmount

      console.log("FRAME AMOUNT TO ADD:")
      console.log(framesAmountSet)


      //pushing new frames
      for (var i = 0; i < framesAmountSet; i++) {
        var new_frame = Object.create(frame);
        new_frame.duration = 1000;
        new_frame.electrodes = Array(16).fill(Array(8).fill(null));
        newFrames.push(new_frame)
      }
    } else {
      newFrames = newFrames.slice(0, newAmount)
    }
    console.log("SLICE:")
    console.log(newFrames)
    this.setState({
      currently_edited_frame: [0],
      frames: newFrames,
      framesAmount: event.target.value,
    });
  }

  renderDurationInput() {
    return (
      <form >
        <label for="frame_duration">
          Current Frame Duration
        </label>
        <input className="control_input" name="frame_duration" type="number" value={this.state.frames[this.state.currently_edited_frame[0]].duration} onChange={this.handleDurationChange.bind(this)} />
        <label for="frame_amount">
          Total amount of frames
        </label>
        <input className="control_input" name="frame_amount" type="number" value={this.state.framesAmount} onChange={this.handleFrameAmountChange.bind(this)} />
      </form>
    )
  }

  renderMetadataInput() {
    return (
      <form >
        <label for="protocol_name" >
          Protocol name
        </label>
        <input className="control_input" name="protocol_name" type="text" value={this.state.protocolName} onChange={this.handleNameChange.bind(this)} />
        <label for="protocol_description">
          Protocol description
        </label>
        <input className="control_input" name="protocol_description" type="text" value={this.state.protocolDescription} onChange={this.handleDescriptionChange.bind(this)} />
      </form>
    )
  }

  layout = [
    { i: "Adaptor", x: 0, y: 0, w: 4, h: 6, minH: 6, maxH: 6, maxW: 7 },
    { i: "SideControls", x: 1, y: 0, w: 2, h: 1 },
    { i: "Protocols", x: 1, y: 1, w: 3, h: 4 },
  ];
  renderMain() {
    console.log("RENDER MAIN")
    return (
      <React.Fragment>
        <HeaderTop username={this.state.username} loggedIn={this.state.loggedIn} logOutHandler={this.state.logOut} />
        <ResponsiveGridLayout
          layouts={{ lg: this.layout }}
          breakpoints={{ lg: 1200 }}//, sm: 768, xs: 400 }}
          cols={{ lg: 10 }}//, sm: 7, xs: 5 }}
          rowHeight={100}
          width={1000}
          draggableCancel=".not_draggable"
          compactType="horizontal"
          maxRows={6}
        >
          <div key="Adaptor" className="not_draggable custom_resize_handle main_cont">
            <AdaptorComponent state={this.state} />
            <EditorButtons state={this.state} />
            <div className="fields_container">
              <div className="left_fields">
              {this.renderDurationInput()}
              </div>
              <div className="right_fields">
              {this.renderMetadataInput()}
              </div>
            </div>
          </div>
          <div key="SideControls" className="not_draggable" >
            <SideButtons />
          </div>
          <div key="Protocols" className="not_draggable" >
            <ProtocolsLister loggedIn={this.state.loggedIn} protocolClick={this.state.loadProtocol} protocols={this.state.protocols}/>
          </div>
        </ResponsiveGridLayout>
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
