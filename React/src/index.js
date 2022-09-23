import React from 'react';
import ReactDOM from 'react-dom/client';
import { Resizable, ResizableBox } from 'react-resizable';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './index.css';
import './bootstrap.scss';
import CartridgeComponent from './cartridge_DIMM';
import AdaptorComponent from './adaptor';
import { Range, getTrackBackground } from "react-range";

function OpenDropLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="54.695"
      height="39.881"
      version="1.1"
      viewBox="0 0 14.471 10.552"
    >
      <g transform="translate(-75.824 -113.02)">
        <g
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeOpacity="1"
          transform="translate(19.732 57.12)"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            strokeWidth="0.232"
            d="M62.877 58.653c-.396-.58-.33-1.51-.23-1.662.099-.152.922-.306 1.6-.114.678.193 1.14.719 1.14.719s-.386.277-.497.669c-.111.391.008.973.008.973-.687.194-1.69-.148-2.02-.585z"
          ></path>
          <path
            fill="#fff"
            fillOpacity="1"
            strokeWidth="0.232"
            d="M65.4 57.573c-.338-.427-.24-1.186-.174-1.286.087-.133.419-.03.741.076.33.108.576.383.634.55-.208.172-.445.313-.578.543-.277-.064-.391-.03-.622.117z"
          ></path>
          <path
            fill="#fff"
            fillOpacity="1"
            strokeWidth="0.232"
            d="M66.633 56.884c.32-.212.643-.276.95-.314-.136-.252-.512-.496-.71-.55-.332.1-.323.521-.24.864z"
          ></path>
          <path
            fill="#fff"
            fillOpacity="1"
            strokeWidth="0.232"
            d="M66.055 57.465a.77.77 0 00-.033.716c.21.345 1.102.91 1.385.817.211-.177.561-.917.561-1.285 0-.368-.26-1.14-.435-1.133-.175.005-1.029.213-1.478.885z"
          ></path>
          <path
            fill="#fff"
            fillOpacity="1"
            strokeWidth="0.232"
            d="M67.95 57.268c.297.08.76-.4.81-.558.05-.157.78.665.748 1.02-.033.356-.194.653-.579.732-.372.076-1.036.078-1.375.363.38-.582.447-1.063.396-1.557z"
          ></path>
          <path
            fill="#fff"
            fillOpacity="1"
            strokeWidth="0.232"
            d="M67.185 59.284c.234-.35.777-.736 1.268-.742.543-.005 1.11-.274 1.647-.975.19-.248.596.946.135 2.114a2.67 2.67 0 01-1.099 1.262c-.496 0-.998-.274-1.273-.864-.275-.59-.678-.795-.678-.795z"
          ></path>
          <path
            fill="#fff"
            fillOpacity="1"
            strokeWidth="0.232"
            d="M67.156 59.29c-.923-.304-1.77-.152-2.202-.064-.108-.294-.126-1.089.146-1.361.432-.433.923-.573.888-.322-.035.252-.108.6.298.94.337.285.69.416 1.104.556-.146.11-.234.251-.234.251z"
          ></path>
          <path
            fill="#5adf3f"
            fillOpacity="1"
            strokeWidth="0.348"
            d="M61.373 58.794c.55-.293 1.087-.549 1.694.07.63.642 1.88.438 2.337.362.56-.094 1.868-.133 2.196.514.508 1.002 1.752 1.62 2.3 1.41.55-.21-.513 1.523-1.167 1.874.151.95-.769 2.566-1.462 2.695-.619.094-1.774-.301-2.37-.558-.596-.257-.643.056-1.028.15-.386.093-.77-.279-.981-.302-.21-.023-1.204 1.373-2.045 1.262-1.42-.188-2.418-2.874-3.014-3.178-.596-.304-1.221-.506-1.54-.823.151-.432.466-.932.735-1.152.608.012 1.745.557 1.932.242.187-.316-.241-.179-.227-.534.025-.664 2.64-2.032 2.64-2.032z"
          ></path>
          <path
            fill="none"
            strokeWidth="0.348"
            d="M60.201 59.465c1.164-.58 2.545-.111 2.907.875.323.88.44 1.5.44 1.5"
          ></path>
          <path
            fill="#000"
            fillOpacity="1"
            strokeWidth="0.348"
            d="M69.133 61.078c-1.168-.444-1.799-.462-2.377-.131-.578.33-1.799 1.127-1.799 1.127s2.313-1.636 2.512-2.033c.198-.396.928.796.928.796z"
          ></path>
          <path
            fill="#000"
            fillOpacity="1"
            strokeWidth="0.348"
            d="M57.961 63.017c.736-.269.994-.532.994-.532s.467.433 1.203.48c.736.046 1.118.017.83.198-.439.105-2.269-.019-2.623.1-.345-.13-.404-.246-.404-.246z"
          ></path>
          <path
            fill="#c1dcfc"
            fillOpacity="1"
            strokeWidth="0.232"
            d="M64.687 63.026c-.454.38-2.189.43-2.429.107-.24-.322.044-.82.347-1.024.31-.208.992-.454 1.562-.157.57.297.975.694.52 1.074z"
          ></path>
          <path
            fill="#000"
            fillOpacity="1"
            strokeWidth="0.232"
            d="M64.888 62.892c.446-.248 1.022-1.114 1.03-1.304.009-.19-.305.15-.487.025-.182-.124-.132-.578-.339-.694-.206-.115-1.111.554-1.293.876-.289-.041-.888.045-1.185.306-.397-.133-.942-.438-1-.34-.058.1-.14 1.065.223 1.265.165.09.19.095.347.083-.136-.347.132-.798.318-.934.228-.167.756-.421 1.045-.405.29.017 1.05.295 1.224.527.173.231.117.595.117.595z"
          ></path>
          <path
            fill="#000"
            fillOpacity="1"
            strokeWidth="0.232"
            d="M63.854 62.19c-.227-.063-.792.019-.799.087-.021.232 1.112-.106 1.01.633.146-.037.523-.135.425-.32-.038-.071-.409-.336-.636-.4z"
          ></path>
        </g>
      </g>
    </svg>
  );
}

function Square(props) {
  return (
    <button className="square" onMouseEnter={props.onMouseEnter} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

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

class HeaderTop extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            {OpenDropLogo()}
            OpenDrop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

class Body extends React.Component {

  constructor(props) {
    super(props);
    let new_frames = new Array();
    var times = 11;

    for(var i = 0; i < times; i++){
        new_frames.push(Array(16).fill(Array(8).fill(null)))
    }
    console.log(new_frames)

        this.state = {
            currently_edited_frame : [0],
            frames: new_frames,
            //squares: Array(16).fill(Array(8).fill("o")),
            //electrodes: Array(128).fill(null),
            instanciatedHooks: false,
            serialPort: null,
            clickHandle: this.handleHover.bind(this)
        };

    console.log(this.state.frames)
  }

  async SelectSerialClick() {
    console.log("CONNECT CLICKED")
    //if ("serial" in navigator) {
    //    console.log("The serial port is supported.")
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
    console.log("serial connected successfully.")
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
    console.log("SEND CLICKED")

    var n=10
    for (let i = 0; i < n; i++) { 
    await this.sleep(1000);

    var newNb = this.state.currently_edited_frame[0] + 1
      if (i == 10) {
        //remove this break for infinite loop
        break;
        i = 0
        var newNb = 0
      }
    let data = this.squaresToBytes(this.state.frames[newNb])
    this.setState(
      {
        currently_edited_frame : [newNb]
      },() => { this.SendSerialData(data)} 
   )

    // Allow the serial port to be closed later.
    }
    //let data = this.squaresToBytes(this.state.frames[this.state.currently_edited_frame[0]])
    //await writer.write(data);
    //writer.releaseLock();
 }

  
  bit_set(num, bit) {
    return num | 1 << bit;
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
        //console.log(i,j)
      }
      console.log(this.dec2bin(byte))
      // output.push(this.renderSquare(i,j));
    }
    console.log(output)
    return output
  }

  handleHover(electrode_id, e) {
    console.log("MOUSE ENTER TOP")
    //console.log(e)
    if (e.type === "click" || e.buttons === 1 || e.buttons === 3) {
        var newArray = this.state.frames[this.state.currently_edited_frame[0]].map(function (arr) {
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
        //console.log(i, j)

        var newFrames = this.state.frames.map(function (arr) {
            return arr.slice();
        });
        newFrames[this.state.currently_edited_frame[0]] = newArray

        this.setState({
            frames: newFrames,
        });
    }
    //console.log(this.state.squares)
}
  
  render() {
    return (
      <React.Fragment>
        <HeaderTop />
          <div class ="mn" >
          <ResizableBox width={'400'} height={'100%'} lockAspectRatio={false}
          axis="x"
          handleSize={[20, 20]}
          minConstraints={[100, 100]} maxConstraints={[800, 800]}>
            <AdaptorComponent state={this.state}/>
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
          max={10}
          onChange={(value) => {
            console.log("ici")
            console.log(value)
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
                    max: 10
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
            </ResizableBox>
          </div>
      </React.Fragment>
    )
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<Game />);
root.render(
  <Body />
);
