import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './bootstrap.scss';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import AdaptorComponent from './adaptor';
import { Range, getTrackBackground } from "react-range";
import GridLayout from "react-grid-layout";
import Preferences from './Preferences';
import LoginForm from './login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  HeaderTop  from './header';


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

// class HeaderTop extends React.Component {
//   render(props) {
//     return (
//       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand href="#home">
//             {OpenDropLogo()}
//             OpenDrop
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="me-auto">
//               <Nav className="logo-title">Platform for Digital Biology</Nav>
//             </Nav>
//             <Nav>
//               <Nav.Link href="#login">
//               <NavLink to="/login" exact >
// 	            Log In
//               </NavLink>
//                 {/* <LoginPrompt state={this.props.state}/>  */}
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     )
//   }
// }

class Body extends React.Component {
  constructor(props) {
    super(props);


    let new_frames = [];

    const frame = {
      duration: 0,
      electrodes: []
    };

    var framesAmountSet = 20;

    for(var i = 0; i <= framesAmountSet; i++){

        var new_frame = Object.create(frame);
        new_frame.duration = 1000;
        new_frame.electrodes = Array(16).fill(Array(8).fill(null));
        new_frames.push(new_frame)
    }

    ////console.log(new_frames)

        this.state = {
            currently_edited_frame : [0],
            frames: new_frames,
            //squares: Array(16).fill(Array(8).fill("o")),
            //electrodes: Array(128).fill(null),
            instanciatedHooks: false,
            serialPort: null,
            clickHandle: this.handleHover.bind(this),
            loggedInCallback: this.loggedInCallback.bind(this),
            logOut: this.logOut.bind(this),
            framesAmount : framesAmountSet,
            username : "oh",
            loggedIn : false,
            accessToken : null,
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

  loggedInCallback(username, token) {
    console.log("LOGGED IN CALLBACK")
    console.log(username)
    console.log(token)
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('username', username);
    this.setState({
      loggedIn : true,
      username : username,
      accessToken : token,
    })
  }

  logOut() {
    console.log("LOG OUT CALL")
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({
      loggedIn : false,
      username : "",
      accessToken : null,
    })
  }

  async SelectSerialClick() {
    //console.log("CONNECT CLICKED")
    //this.setLogginToggle(true)
    //console.log("USERNAME :")
    //console.log(this.state.username)
    //if ("serial" in navigator) {
    //    //console.log("The serial port is supported.")
    // The Web Serial API is supported.
    //} else {
    //TODO :
    //Propoer error message ?
    //    alert("This web browser is not compatible with serial API")
    //}
    const port = await navigator.serial.requestPort();
    this.setState({
      serialPort: port
    })
    await port.open({ baudRate: 115200 });
    //console.log("serial connected successfully.")
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async SendSerialData(data){

    const writer = this.state.serialPort.writable.getWriter();
    await writer.write(data);
    writer.releaseLock();
  }

  async SendClick() {
    //console.log("SEND CLICKED")

    var n= this.state.framesAmount

    //send first frame
    let data = this.squaresToBytes(this.state.frames[this.state.currently_edited_frame[0]].electrodes)
    this.setState(
      {
        currently_edited_frame : [this.state.currently_edited_frame[0]]
      },() => { this.SendSerialData(data)} 
   )

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
        currently_edited_frame : [newNb]
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
            return {...arr}
        });
        newFrames[this.state.currently_edited_frame[0]].electrodes = newArray

        this.setState({
            frames: newFrames,
        });
    }
    ////console.log(this.state.squares)
}

  FrameSelector(){

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
          values={this.state.currently_edited_frame}
          step={1}
          min={0}
          max={this.state.framesAmount}
          onChange={(value) => {
            //console.log("ici")
            //console.log(value)
            this.setState({ currently_edited_frame : value })
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
                    values: this.state.currently_edited_frame,
                    colors: ["#548BF4", "#ccc"],
                    min: 0,
                    max: this.state.framesAmount
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
              {this.state.currently_edited_frame[0]}
            </div> 

          )}
        />
            </div> 
        <SelectSerial onClick={() => this.SelectSerialClick()} />
        <Send onClick={() => this.SendClick()} />
      </React.Fragment>
)
}

handleDurationChange(event) {

  var newFrames = this.state.frames.map(function (arr) {
    //return arr.slice();
    return {...arr}
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
    return {...arr}
  });

  var framesAmountSet = 0;
  if (this.state.framesAmount < event.target.value) {
    framesAmountSet = event.target.value - this.state.framesAmount 

  //console.log("FRAME AMOUNT TO ADD:")
  //console.log(framesAmountSet)
  
    for(var i = 0; i <= framesAmountSet; i++){
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
    currently_edited_frame : [0],
    frames: newFrames,
    framesAmount: event.target.value,
});
}

renderDurationInput(){
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
         <HeaderTop state={this.state}/> 
          {/* <div class ="mn" > */}
          <GridLayout className="layout" cols={16} rowHeight={30} width={1200} draggableCancel=".not_draggable" compactType="horizontal">
        <div key="b" data-grid={{ x: 0, y: 0, w: 9, h: 6, minW: 2, maxW: 10, minH: 4 }} className = "not_draggable">
           <AdaptorComponent state={this.state}/>
                {this.FrameSelector()}
                {this.renderDurationInput()}
        </div>

        {/* <div key="c" data-grid={{ x: 4, y: 0, w: 3, h: 6, minW: 2, maxW: 10, minH: 4 }}>
                {this.FrameSelector()}
        </div> */}
      </GridLayout>
      </React.Fragment>
    )
  }

render (){

  return (
  <div className="wrapper">
  <BrowserRouter>
  <Routes>
        <Route path="/" element={this.renderMain()} />
        <Route path="/login" element={<LoginForm state={this.state} />} />
        <Route path="/preferences" element={<Preferences />} />
  </Routes>
  </BrowserRouter>
</div>
)
}
}

const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<Game />);
root.render(
      <Body/>
);
