import React from 'react';
import Fragment from 'react';
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
import { GenerateAuthHeader, SimpleHash } from "./utils";
import { faUtensilSpoon } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SwitchTheme } from './graphics';


import { SaveDialog, DeleteDialog, UnsavedDialog } from './dialogs';
import { DateTime } from "luxon";
const ResponsiveGridLayout = WidthProvider(Responsive);
const default_frame_amount = 2;



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
      electrodesFeedback: this.generateEmptyFeedbackArray(),
      serialPort: null,
      clickHandle: this.handleHover.bind(this),
      loggedInCallback: this.loggedInCallback.bind(this),
      logOut: this.logOut.bind(this),
      loadProtocol: this.handleLoadProtocol.bind(this),
      setEditedFrame: this.setEditedFrame.bind(this),
      setSerialPort: this.setSerialPort.bind(this),
      serialSendClick: this.serialSendClick.bind(this),
      goToNextFrame: this.goToNextFrame.bind(this),
      toggleLoopMode: this.toggleLoopMode.bind(this),
      goToPreviousFrame: this.goToPreviousFrame.bind(this),
      saveClick: this.saveClick.bind(this),
      deleteClick: this.deleteProtocolClick.bind(this),
      liveModeTrigger: this.liveModeTrigger.bind(this),
      handleFrameAmountChange: this.handleFrameAmountChange.bind(this),
      setDefaultFrameDuration: this.setDefaultFrameDuration.bind(this),
      insertBlankFrame: this.insertBlankFrame.bind(this),
      duplicateFrame: this.duplicateFrame.bind(this),
      deleteFrame: this.deleteFrame.bind(this),
      clearFrame: this.clearFrame.bind(this),
      clearAllFrames: this.clearAllFrames.bind(this),
      framesAmount: 2,
      liveMode: false,
      username: "oh",
      loggedIn: false,
      accessToken: null,
      playing: false,
      authHeader: "",
      saveDialogOpen: false,
      deleteDialogOpen: false,
      unsavedDialogOpen: false,
      protocols: [],
      loadedProtocolID: null,
      loadedProtocolHash: "",
      loopMode: true,
      defaultDuration: 1000,
      temperatureReadings: new Float32Array(3).fill(0.0),
    };

    //retreive logged in infos
    var atoken = localStorage.getItem('token')
    var ausername = localStorage.getItem('username')
    console.log("TOKEN SET:")
    console.log(atoken)
    console.log(ausername)


    if (atoken != null && ausername != null) {
      var tokenObj = JSON.parse(atoken)

      var token_expiration_date = DateTime.fromISO(tokenObj.expiration_date)
      var now = DateTime.now()

      var expired_token = (token_expiration_date < now)

      if (!expired_token) {
        this.state.loggedIn = true
        this.state.username = ausername
        this.state.accessToken = tokenObj
        this.state.authHeader = GenerateAuthHeader(ausername, tokenObj)
      }
    }
  }

  setTemperatureReading(key, temprature) {
    var newTempReadings = this.state.temperatureReadings
    newTempReadings[key] = temprature

    this.setState(
      {
        temperatureReadings : newTempReadings
      }
    )
  }


  async componentDidMount() {
    console.log("COMPONENT DID MOUNT : Main")
    this.allocCleanFrames(default_frame_amount)

    let BackendProtocolsResponse = await this.retreiveUserProtocols()
    this.setState(
      {
        protocols: BackendProtocolsResponse.protocols
      }
    )

    // Query the table
    const table = document.getElementById('resizeMe');

    // Query all headers
    const cols = table.querySelectorAll('th');

    // Loop over them
    for (let i = 0; i < cols.length; i++) {
      let col = cols[i]
      const resizer = document.createElement('div');
      resizer.classList.add('resizer');

      // Set the height
      resizer.style.height = `${table.offsetHeight}px`;

      // Add a resizer element to the column
      col.appendChild(resizer);

      // Will be implemented in the next section
      this.createResizableColumn(col, resizer);

    }
  }


  createResizableColumn(col, resizer) {
    // Track the current position of mouse
    let x = 0;
    let w = 0;

    const mouseDownHandler = function (e) {
      // Get the current mouse position
      x = e.clientX;

      // Calculate the current width of column
      const styles = window.getComputedStyle(col);
      w = parseInt(styles.width, 10);

      // Attach listeners for document's events
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
      resizer.classList.add('resizing');
    };

    const mouseMoveHandler = function (e) {
      // Determine how far the mouse has been moved
      const dx = e.clientX - x;

      // Update the width of column
      col.style.width = `${w + dx}px`;
    };

    // When user releases the mouse, remove the existing event listeners
    const mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      resizer.classList.remove('resizing');
    };

    resizer.addEventListener('mousedown', mouseDownHandler);
  }



  generateEmptyFeedbackArray() {
    var feedbackArray = Array(16);
    for (var j = 0; j < feedbackArray.length; j++) {
      feedbackArray[j] = Array(8).fill(null)
    }
    return feedbackArray
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
      new_frame.electrodes = Array(16);
      for (var j = 0; j < new_frame.electrodes.length; j++) {
        new_frame.electrodes[j] = Array(8).fill(null)
      }
      //console.log(new_frame)
      new_frames.push(new_frame)
    }

    console.log("FRAMES ALLOC")
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

  toggleLoopMode() {
    this.setState({
      loopMode: !this.state.loopMode,
    })
  }

  setDefaultFrameDuration(event) {

    //Parse new amount, default to 2 if NaN
    var parsedValue = (parseInt(event.target.value) || 1000)
    if (parsedValue < 1) {
      parsedValue = 1
    }
    this.setState({
      defaultDuration: parsedValue,
    })
  }


  goToNextFrame() {
    if (this.state.currently_edited_frame[0] == (this.state.framesAmount - 1)) {
      this.setNewFrameAmount(this.state.framesAmount + 1)
    }
    this.setState({
      currently_edited_frame: [this.state.currently_edited_frame[0] + 1],
    }, this.handleLiveDeviceSend)
  }

  setEditedFrame(frame_id) {
    console.log("SET EDITED FRAME CALL")
    this.setState({
      currently_edited_frame: frame_id,
    }, this.handleLiveDeviceSend)
  }

  setSerialPort(port_id) {
    this.setState({
      serialPort: port_id
    })
  }

  async readInto(reader, buffer) {
    let offset = 0;
    while (offset < buffer.byteLength) {
      const { value, done } = await reader.read(
        new Uint8Array(buffer, offset)
      );
      if (done) {
        break;
      }
      buffer = value.buffer;
      offset += value.byteLength;
    }
    return buffer;
  }

  async readSerialBytes(amountOfBytes) {
    // Open serail port with custom buffer
    const reader = this.state.serialPort.readable.getReader({ mode: 'byob' });
    let buffer = new ArrayBuffer(amountOfBytes);
    // Read in buffer
    buffer = await this.readInto(reader, buffer);
    // Cast buffer to bytes array
    const bytes = new Uint8Array(buffer, 0, amountOfBytes);
    reader.releaseLock();
    return bytes
  }

  async collectFeedbackData() {
    //Feedback data
    let readBytes = await this.readSerialBytes(24)
    console.log("RAW FEEDBACK BYTES:")
    console.log(readBytes)
    let electrodesFeedback = readBytes.slice(0, 16)
    this.setState(
      {
        electrodesFeedback: this.electrodeBytesToSquares(electrodesFeedback)
      }
    )

    this.parseTemperatures(readBytes.slice(17,23))
  }

  parseTemperatures(temperaturesBytes) {

    var tempReadings = this.state.temperatureReadings

    tempReadings[0] = parseFloat(temperaturesBytes[1])
    tempReadings[1] = parseFloat(temperaturesBytes[3])
    tempReadings[2] = parseFloat(temperaturesBytes[5])

    this.setState(
      {
        temperatureReadings : tempReadings
      }
    )


  }

  async SendSerialDataAndCollectFeedback(data) {
    if (!this.state.liveMode) {
      await this.collectFeedbackData()
      return
    }

    const writer = this.state.serialPort.writable.getWriter();
    await writer.write(data);
    writer.releaseLock();

    await this.collectFeedbackData()
  }

  getNthBit(uint8, n) {
    return (uint8 >> n) & 0x1;
  }

  electrodeBytesToSquares(bytesArray) {
    let squares = this.generateEmptyFeedbackArray()

    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.getNthBit(bytesArray[i], j) == 1) {
          squares[i][7 - j] = 1
        }
      }
    }
    console.log("FEEDBACK:")
    console.log(squares)
    return squares
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
      this.SendSerialDataAndCollectFeedback(data)
    }
  }

  async playProtocol() {
    var n = this.state.framesAmount

    //send first frame
    let data = this.squaresToBytes(this.state.frames[this.state.currently_edited_frame[0]].electrodes)
    this.SendSerialDataAndCollectFeedback(data)

    await this.sleep(this.state.frames[this.state.currently_edited_frame[0]].duration);

    //loop through frames
    //console.log(this.state.currently_edited_frame[0])
    //for (let i = this.state.currently_edited_frame[0]; i < n - 1; i++) {
    while (true) {
      if (!this.state.playing) {
        return
      }

      //var oldNb = this.state.currently_edited_frame[0]
      var newNb = this.state.currently_edited_frame[0] + 1

      // if (i === this.state.framesAmount) {
      //   //remove this break for infinite loop
      //   if (!this.state.loopMode) {
      //     break;
      //   }
      // }
      if (newNb != this.state.framesAmount) {
        let data = this.squaresToBytes(this.state.frames[newNb].electrodes)
        this.setState(
          {
            currently_edited_frame: [newNb]
          }, () => {
            this.SendSerialDataAndCollectFeedback(data);
          }
        )
        await this.sleep(this.state.frames[newNb].duration);
      } else {
        //End of frames reached
        if (!this.state.loopMode) {
          break;
        } else {
          let newNb = 0
          let data = this.squaresToBytes(this.state.frames[newNb].electrodes)
          this.setState(
            {
              currently_edited_frame: [newNb]
            }, () => {
              this.SendSerialDataAndCollectFeedback(data);
            })
          await this.sleep(this.state.frames[this.state.currently_edited_frame[0]].duration);
        }

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

  async refreshUserProtocols() {
    console.log("REFRESH PROTOCOLS TRIGGER")
    let BackendProtocolsResponse = await this.retreiveUserProtocols()
    this.setState(
      {
        protocols: BackendProtocolsResponse.protocols
      }
    )
  }

  async deleteProtocolClick(protocolID, protocolName) {
    console.log("DELETE PROTOCOL CLICK TRIGGER")

    this.setState({
      deleteDialogOpen: true,
      protocolToDeleteID: protocolID,
      protocolToDeleteName: protocolName
    })

  }

  async handleDeleteProtocol() {
    await this.deleteProtocol(this.state.protocolToDeleteID)

    let BackendProtocolsResponse = await this.retreiveUserProtocols()
    this.setState(
      {
        protocols: BackendProtocolsResponse.protocols,
        deleteDialogOpen: false
      }
    )
    if (this.state.protocolToDeleteID == this.state.loadedProtocolID) {
      this.setState(
        {
          loadedProtocolID: null
        }
      )
      this.allocCleanFrames(default_frame_amount)
    }
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
    }, this.refreshUserProtocols)
  }

  logOut() {
    console.log("LOG OUT CALL")
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({
      loggedIn: false,
      username: "",
      accessToken: null,
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
      serialPort: null,
      framesAmount: 2,
      liveMode: false,
      playing: false,
      authHeader: "",
      saveDialogOpen: false,
      deleteDialogOpen: false,
      protocols: [],
      loadedProtocolID: null,
      loopMode: false
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
    const route = "/protocol"
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

  async deleteProtocol(protocolID) {

    let requestResp
    const route = "/protocol/" + protocolID
    const api_url = process.env.REACT_APP_API_URL

    try {
      requestResp = await fetch(api_url + route, {
        method: 'DELETE',
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
      return requestResp
    }
  }

  async overwriteProtocol(protocolID, protocol) {

    let requestResp
    const route = "/protocol/" + protocolID
    const api_url = process.env.REACT_APP_API_URL

    try {
      requestResp = await fetch(api_url + route, {
        method: 'PUT',
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
      return requestResp
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


    //console.log("NEWAMOUNT:")
    //console.log(newAmount)

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
          var x = Math.floor(electrode_id / 8);
          var y = electrode_id % 8;
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
      }, () => {
        let protocolStr = JSON.stringify(this.SerializeStateProtocol())
        let protocolHash = SimpleHash(protocolStr)
        console.log("LOADED PROTOCOL HASH =" + protocolHash)
        this.setState(
          {
            loadedProtocolHash: protocolHash
          }
        )
      }
    )

  }

  async handleLoadProtocol(protocol_id) {
    //Detecting unsaved change in loaded protocol
    console.log("LOAD PROTOCOL CALL")
    let protocolStr = JSON.stringify(this.SerializeStateProtocol())
    let protocolHash = SimpleHash(protocolStr)
    console.log("ACTUAL PROTOCOL HASH=" + protocolHash)
    console.log("LOADED PROTOCOL HASH=" + this.state.loadedProtocolHash)
    if (this.state.loadedProtocolID != null && this.state.loadedProtocolHash !== protocolHash) {
      this.setState({
        protocolToLoadID: protocol_id,
        unsavedDialogOpen: true
      })
      return;
    }
    await this.loadProtocol(protocol_id)
  }

  async loadProtocol(protocol_id) {
    console.log(protocol_id)
    let BackendProtocol = await this.retreiveProtocol(protocol_id)
    console.log(BackendProtocol)
    this.loadBackendProtocolToState(BackendProtocol)

    //TODO : error handling
    this.setState(
      {
        loadedProtocolID: protocol_id
      }
    )
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
      frameToAdd.duration = parseInt(this.state.frames[i].duration)
      frameToAdd.rank = i
      frameToAdd.electrodes = []

      //Generate electrodes
      for (var x = 0; x < 16; x++) {
        for (var y = 0; y < 8; y++) {
          if (this.state.frames[i].electrodes[x][y] != null) {
            console.log("DETECTED ELECTRODE")
            //rebuilding electrode
            var electrodeToAdd = Object.create(electrode)
            electrodeToAdd.electrode_id = ((x * 8) + y).toString()
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
    if (this.state.loadedProtocolID != null) {
      this.setState({
        saveDialogOpen: true
      })
    } else {
      await this.handleCreateNewProtocol()
    }

    // var currentProtocol = this.SerializeStateProtocol()

    // await this.saveNewProtocol(currentProtocol)
    // let BackendProtocolsResponse = await this.retreiveUserProtocols()
    // this.setState(
    //   {
    //     protocols : BackendProtocolsResponse.protocols
    //   }
    // )
  }


  async handleCreateNewProtocol() {
    console.log("NEW PROTOCOL CLICK TRIGGER")
    this.setState({
      saveDialogOpen: false
    })

    var currentProtocol = this.SerializeStateProtocol()

    let resp = await this.saveNewProtocol(currentProtocol)
    console.log(resp)
    let BackendProtocolsResponse = await this.retreiveUserProtocols()
    this.setState(
      {
        protocols: BackendProtocolsResponse.protocols,
        loadedProtocolID: resp.id
      }
    )
  }

  async handleOverwriteProtocol() {
    console.log("OVERWRITE PROTOCOL CLICK TRIGGER")
    this.setState({
      saveDialogOpen: false
    })

    var currentProtocol = this.SerializeStateProtocol()

    await this.overwriteProtocol(this.state.loadedProtocolID, currentProtocol)
    //TODO : check save success ?
    let protocolStr = JSON.stringify(this.SerializeStateProtocol())
    let protocolHash = SimpleHash(protocolStr)
    console.log("SAVED PROTOCOL HASH =" + protocolHash)
    this.setState(
      {
        loadedProtocolHash: protocolHash
      }
    )

    let BackendProtocolsResponse = await this.retreiveUserProtocols()
    this.setState(
      {
        protocols: BackendProtocolsResponse.protocols
      }
    )
  }



  liveModeTrigger() {
    console.log("LIVE MODE CLICK TRIGGER")
    this.setState(
      {
        liveMode: !this.state.liveMode
      },
      () => {
        if (this.state.liveMode) {
          console.log("STARTING LIVE MODE INTERVAL")
          this.handleLiveDeviceSend()
          const timer = setInterval(() => {
            if (!this.state.liveMode) {
              console.log("STOPPING LIVE MODE INTERVAL")
              clearInterval(timer);
              return;
            }
            this.handleLiveDeviceSend()
          }, 500);
        }


      }
      //this.handleLiveDeviceSend
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

  bit_set(num, bit) {
    return num | (1 << bit);
  }

  dec2bin(dec) {
    return (dec >>> 0).toString(2);
  }

  squaresToBytes(squares) {
    let output = new Uint8Array(32);

    //Setting electrodes bytes
    for (let i = 0; i < 16; i++) {
      let byte = 0
      for (let j = 0; j < 8; j++) {
        if (squares[i][j] != null) {
          byte = this.bit_set(byte, j)
        }
        output[i] = byte
        ////console.log(i,j)
      }
      //console.log(this.dec2bin(byte))
      // output.push(this.renderSquare(i,j));
    }
    //Setting commands bytes

    //enable feedback
    output[24] = 1

    //temperature commands
    //26 = temp 1
    //27 = temp 2
    //28 = temp 3
    output[26] = 30
    output[27] = 30
    output[28] = 10

    //magnet bytes
    //0 = off
    //1 = left magnet
    //2 = right magnet
    //3 = both
    output[16] = 0

    console.log("SENT DATA:")
    console.log(output)
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
      var i = Math.floor(electrode_id / 8);
      var j = electrode_id % 8;

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

    //Parse new amount, default to 2 if NaN
    var newAmount = (parseInt(event.target.value) || 2)
    if (newAmount < 2) {
      newAmount = 2
    }
    this.setNewFrameAmount(newAmount)

  }

  newBlankFrame() {
    const frame = {
      duration: 0,
      electrodes: []
    };
    var new_frame = Object.create(frame);
    new_frame.duration = 1000;
    new_frame.electrodes = Array(16);
    for (var j = 0; j < new_frame.electrodes.length; j++) {
      new_frame.electrodes[j] = Array(8).fill(null)
    }
    return new_frame
  }

  insertBlankFrame() {
    //this.setNewFrameAmount(this.state.framesAmount + 1)
    let at = this.state.currently_edited_frame[0] + 1
    //copy frames
    let ret = Array()
    var beforeFrames = this.state.frames.slice(0, at).map(function (arr) {
      return { ...arr }
    });
    var afterFrames = this.state.frames.slice(at, this.state.frames.length).map(function (arr) {
      return { ...arr }
    });
    // console.log("BEFORE:")
    // console.log(beforeFrames)
    // console.log("AFTER:")
    // console.log(afterFrames)

    ret.push(...beforeFrames)
    ret.push(this.newBlankFrame())
    ret.push(...afterFrames)
    console.log("RET:")
    console.log(ret)
    this.setState({
      currently_edited_frame: [at],
      frames: ret,
      framesAmount: this.state.framesAmount + 1,
    }, this.handleLiveDeviceSend);
  }

  duplicateFrame() {
    //this.setNewFrameAmount(this.state.framesAmount + 1)
    let at = this.state.currently_edited_frame[0] + 1
    //copy frames
    let ret = Array()
    var beforeFrames = this.state.frames.slice(0, at).map(function (arr) {
      return { ...arr }
    });
    var afterFrames = this.state.frames.slice(at, this.state.frames.length).map(function (arr) {
      return { ...arr }
    });
    // console.log("BEFORE:")
    // console.log(beforeFrames)
    // console.log("AFTER:")
    // console.log(afterFrames)

    ret.push(...beforeFrames)
    ret.push(beforeFrames.slice(beforeFrames.length - 1, beforeFrames.length)[0])
    ret.push(...afterFrames)
    console.log("RET:")
    console.log(ret)
    this.setState({
      currently_edited_frame: [at],
      frames: ret,
      framesAmount: this.state.framesAmount + 1,
    }, this.handleLiveDeviceSend);
  }

  clearFrame() {
    let at = this.state.currently_edited_frame[0]

    var framesCopy = this.state.frames.map(function (arr) {
      return { ...arr }
    });
    framesCopy[at] = this.newBlankFrame()
    this.setState({
      frames: framesCopy,
    }, this.handleLiveDeviceSend);
  }

  clearAllFrames() {
    this.allocCleanFrames(this.state.framesAmount)
  }

  deleteFrame() {
    //this.setNewFrameAmount(this.state.framesAmount + 1)
    if (this.state.framesAmount <= 2) {
      toast.error("Minimal amount of 2 frames reached", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    let at = this.state.currently_edited_frame[0]
    if (at == this.state.framesAmount - 1) {
      console.log("EDGE CASE")
      this.setNewFrameAmount(this.state.framesAmount - 1)
      this.setState({
        currently_edited_frame: [at - 1],
      }, this.handleLiveDeviceSend)
      return
    }
    //copy frames
    let ret = Array()
    var beforeFrames = this.state.frames.slice(0, at).map(function (arr) {
      return { ...arr }
    });
    var afterFrames = this.state.frames.slice(at + 1, this.state.frames.length).map(function (arr) {
      return { ...arr }
    });
    // console.log("BEFORE:")
    // console.log(beforeFrames)
    // console.log("AFTER:")
    // console.log(afterFrames)

    ret.push(...beforeFrames)
    ret.push(...afterFrames)
    console.log("RET:")
    console.log(ret)
    this.setState({
      currently_edited_frame: [at],
      frames: ret,
      framesAmount: this.state.framesAmount - 1,
    }, this.handleLiveDeviceSend);
  }

  // setNewFrameAmount sets a new frame amount,
  // /!\ discard frames if new amount is smaller
  setNewFrameAmount(newAmount) {

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
        new_frame.electrodes = Array(16);
        for (var j = 0; j < new_frame.electrodes.length; j++) {
          new_frame.electrodes[j] = Array(8).fill(null)
        }
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
      framesAmount: newAmount,
    });
  }


  renderDurationInput() {
    return (
      <React.Fragment>
        <div className="fields_column">
          <form >
            <label htmlFor="frame_duration">
              Frame duration (ms)
            </label>
            <input className="control_input" name="frame_duration" type="number" value={this.state.frames[this.state.currently_edited_frame[0]].duration} onChange={this.handleDurationChange.bind(this)} />
          </form>
        </div>
        <div className="fields_column">
          <form >
            <label htmlFor="temp1">
              Temperature 1 (??c)
            </label>
            <div className="temp_input">
              <input className="temp_field" name="temp1" type="number" value={this.state.frames[this.state.currently_edited_frame[0]].duration} onChange={this.handleDurationChange.bind(this)} />
              <input className="temp_reading" name="temp1_reading"  value={this.state.temperatureReadings[0]+"??"} readonly disabled/>
            </div>
          </form>
          <form >
            <label htmlFor="temp2">
              Temperature 2 (??c)
            </label>
            <div className="temp_input">
              <input className="temp_field" name="temp2" type="number" value={this.state.frames[this.state.currently_edited_frame[0]].duration} onChange={this.handleDurationChange.bind(this)} />
              <input className="temp_reading" name="temp2_reading" value={this.state.temperatureReadings[1]+"??"} readonly disabled/>
            </div>
          </form>
          <form >
            <label htmlFor="temp3">
              Temperature 3 (??c)
            </label>
            <div className="temp_input">
              <input className="temp_field" name="temp3" type="number" value={this.state.frames[this.state.currently_edited_frame[0]].duration} onChange={this.handleDurationChange.bind(this)} />
              <input className="temp_reading" name="temp3_reading" value={this.state.temperatureReadings[2]+"??"} readonly disabled/>
            </div>
          </form>
        </div>
        <div className="fields_column">
        <ThemeProvider theme={SwitchTheme}>
          <form>
            <Switch 
            //defaultChecked 
              size="small" 
              // checked={this.props.state.loopMode}
              // onChange={this.props.state.toggleLoopMode}
            /> Magnet 1
            </form>

          <form>
            <Switch 
            //defaultChecked 
              size="small" 
            // checked={this.props.state.loopMode}
              // onChange={this.props.state.toggleLoopMode}
            /> Magnet 2
            </form>
 
          </ThemeProvider>
        </div>
 
      </React.Fragment>
    )
  }

  renderMetadataInput() {
    return (
      <form >
        <label htmlFor="protocol_name" >
          Protocol name
        </label>
        <input className="control_input" name="protocol_name" type="text" value={this.state.protocolName} onChange={this.handleNameChange.bind(this)} />
        <label htmlFor="protocol_description">
          Protocol description
        </label>
        <input className="control_input" name="protocol_description" type="text" value={this.state.protocolDescription} onChange={this.handleDescriptionChange.bind(this)} />
      </form>
    )
  }

  handleSaveDialogClose = () => {
    this.setState(
      {
        saveDialogOpen: false
      }
    )
  };
  handleDeleteDialogClose = () => {
    this.setState(
      {
        deleteDialogOpen: false
      }
    )
  };
  handleUnsavedDialogClose = () => {
    this.setState(
      {
        unsavedDialogOpen: false
      }
    )
  };


  layout = [
    { i: "Adaptor", x: 0, y: 0, w: 4, h: 6, minH: 6, maxH: 6, maxW: 7 },
    { i: "SideControls", x: 1, y: 0, w: 1, h: 3 },
    { i: "Protocols", x: 2, y: 0, w: 3, h: 4 },
  ];
  renderMain() {
    console.log("RENDER MAIN")
    return (
      <React.Fragment>
        <ToastContainer />
        <HeaderTop username={this.state.username} loggedIn={this.state.loggedIn} logOutHandler={this.state.logOut} />
        <SaveDialog
          open={this.state.saveDialogOpen}
          //open={false} 
          handleClose={this.handleSaveDialogClose.bind(this)}
          handleCreateNew={this.handleCreateNewProtocol.bind(this)}
          handleOverwrite={this.handleOverwriteProtocol.bind(this)}
        />
        <DeleteDialog
          open={this.state.deleteDialogOpen}
          handleClose={this.handleDeleteDialogClose.bind(this)}
          handleDelete={this.handleDeleteProtocol.bind(this)}
          protocolName={this.state.protocolToDeleteName}
        />
        <UnsavedDialog
          open={this.state.unsavedDialogOpen}
          handleClose={this.handleUnsavedDialogClose.bind(this)}
          handleDiscard={() => {
            this.loadProtocol(this.state.protocolToLoadID)
            this.setState({
              unsavedDialogOpen: false
            })
          }}
          protocolName={this.state.protocolName}
        />

        {/* <ResponsiveGridLayout
          layouts={{ lg: this.layout }}
          breakpoints={{ lg: 1200 }}//, sm: 768, xs: 400 }}
          cols={{ lg: 10 }}//, sm: 7, xs: 5 }}
          rowHeight={100}
          width={1000}
          draggableCancel=".not_draggable"
          compactType="horizontal"
          maxRows={6}
        > */}
        <div id="main_grid">
          <table id="resizeMe" className="table">
            <th className="adaptor_th" >
              <div key="gridelem_adaptor" className="scrollable main_cont">
                <AdaptorComponent state={this.state} />
                <EditorButtons state={this.state} />
                <div className="fields_container">
                  {this.renderDurationInput()}
                  <div className="fields_column">
                    {this.renderMetadataInput()}
                  </div>
                </div>
              </div>
            </th>
            <th className="side_controls_th">
              <div key="SideControls" className="scrollable" >
                <SideButtons
                  insertBlankFrame={this.state.insertBlankFrame}
                  duplicateFrame={this.state.duplicateFrame}
                  deleteFrame={this.state.deleteFrame}
                  clearFrame={this.state.clearFrame}
                  clearAllFrames={this.state.clearAllFrames}
                  framesAmount={this.state.framesAmount}
                />
              </div>
            </th>
            <th className="lister_th" >
              <div key="Protocols" className="scrollable" >
                <ProtocolsLister loggedIn={this.state.loggedIn} protocolLoadClick={this.state.loadProtocol} protocols={this.state.protocols} protocolDeleteClick={this.state.deleteClick} loadedProtocolID={this.state.loadedProtocolID} />
              </div>
            </th>
          </table>
        </div>
        {/* </ResponsiveGridLayout> */}
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
