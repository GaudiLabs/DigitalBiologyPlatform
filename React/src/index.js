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



class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(16).fill(Array(8).fill(null)),
      serialPort: null
    };
  }

  handleHover(i, j, e) {
    console.log("MOUSE ENTER")
    console.log(e)
    if (e.type === "click" || e.buttons === 1 || e.buttons === 3) {
      var newArray = this.state.squares.map(function (arr) {
        return arr.slice();
      });

      if (newArray[i][j] != null) {
        newArray[i][j] = null;
      } else {
        newArray[i][j] = '🟦';
      }
      console.log(i, j)

      this.setState({
        squares: newArray,
      });
    }
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

  async SendClick(serialPort, squares) {
    console.log("SEND CLICKED")
    const writer = serialPort.writable.getWriter();
    // const data = new Uint8Array([
    //     100, 100, 100, 100, 100, 100, 100, 100,
    //     100, 100, 100, 100, 100, 100, 100, 100,
    //     100, 100, 100, 100, 100, 100, 100, 100,
    //     100, 100, 100, 100, 100, 100, 100, 100,
    // ]);
    // hello
    let data = this.squaresToBytes(squares)
    await writer.write(data);
    // Allow the serial port to be closed later.
    writer.releaseLock();
  }

  renderSquare(i, j) {
    return (<Square
      value={this.state.squares[i][j]}
      onMouseEnter={(e) => this.handleHover(i, j, e)}
      onClick={(e) => this.handleHover(i, j, e)}
    />
    );
  }

  renderRow(board, i) {
    let cells = [];
    for (let j = 0; j < 16; j++) {
      cells.push(this.renderSquare(i, j));
    }
    return (
      <div className="board-row">
        {cells}
      </div>
    )
  }

  renderBoard(board) {
    let rows = [];
    for (let i = 0; i < 8; i++) {
      rows.push(this.renderRow(board, i));
    }
    return rows
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {
            this.renderBoard(this.state.squares)
          }
        </div>
        <SelectSerial onClick={() => this.SelectSerialClick()} />
        <Send onClick={() => this.SendClick(this.state.serialPort, this.state.squares)} />
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

class Adaptor extends React.Component {
  //width="378.516"
  //height="282.607"

  renderAdaptor() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 100.149 74.773"
      >
        <g
          strokeOpacity="1"
          display="inline"
          transform="translate(-53.01 -88.215)"
        >
          <path
            style={{ fontVariationSettings: "normal" }}
            fill="red"
            fillOpacity="0.995"
            stroke="#2f2f2f"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="4"
            strokeWidth="0.15"
            d="M53.14 88.29H153.084V105.43900000000001H53.14z"
            opacity="1"
            stopColor="#000"
            stopOpacity="1"
          ></path>
          <path
            fill="red"
            fillOpacity="0.989"
            stroke="#2e2e2e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.1"
            d="M153.084 162.937v-69.52l-37.414.025a4.958 4.958 0 01-1.683 2.967 4.885 4.885 0 01-3.182 1.152H95.362a4.884 4.884 0 01-3.18-1.152 4.841 4.841 0 01-1.664-2.967l-37.433-.025v69.52l6 .001a6.485 6.485 0 005.625-3.249 6.491 6.491 0 015.624-3.25l65.5-.001c2.324 0 4.47 1.24 5.628 3.255a6.477 6.477 0 005.622 3.245z"
          ></path>
          <path
            d="M53.085 93.417l37.433.025a4.841 4.841 0 001.664 2.967c.89.75 2.018 1.159 3.18 1.152h15.443a4.885 4.885 0 003.182-1.152 4.958 4.958 0 001.683-2.967l37.414-.025v12.022H53.085z"
            style={{ fontVariationSettings: "normal", InkscapeStroke: "none" }}
            fill="#4d4d4d"
            fillOpacity="0.995"
            stroke="#2f2f2f"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="4"
            strokeWidth="0.15"
            opacity="1"
            stopColor="#000"
            stopOpacity="1"
            vectorEffect="none"
          ></path>
          <circle
            cx="59.085"
            cy="159.439"
            r="3.1"
            fill="#008484"
            fillOpacity="0"
            stroke="#f4f4f4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.15"
          ></circle>
          <circle
            cx="147.085"
            cy="159.439"
            r="3.1"
            fill="#008484"
            fillOpacity="0"
            stroke="#f4f4f4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.15"
          ></circle>
          <path
            fill="#c2c200"
            fillOpacity="0"
            stroke="#303030"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.1"
            d="M64.713 159.689h-.008"
          ></path>
          <path
            fill="#c2c200"
            fillOpacity="0"
            stroke="#303030"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.1"
            d="M141.464 159.689l-.005.008"
          ></path>
          <path
            fill="#c2c200"
            fillOpacity="0"
            stroke="#c2c200"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.1"
            d="M115.658 93.466l.025-.049"
          ></path>
          <path
            fill="#c2c200"
            fillOpacity="0"
            stroke="#c2c200"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.1"
            d="M90.524 93.417l-.012.049"
          ></path>
          <g
            fillOpacity="1"
            stroke="#303030"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeMiterlimit="4"
            transform="translate(.491 -7.648)"
          >
            <ellipse
              style={{ fontVariationSettings: "normal" }}
              cx="58.593"
              cy="167.087"
              fill="#666"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.15"
              opacity="1"
              rx="2.35"
              ry="2.35"
              stopColor="#000"
              stopOpacity="1"
            ></ellipse>
            <path
              style={{ fontVariationSettings: "normal", InkscapeStroke: "none" }}
              fill="#333"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeWidth="0.1"
              d="M58.896 167.907c-.016.144-.018.907-.096.944-.048.021-.205.019-.205.019s-.156.003-.204-.019c-.078-.037-.08-.8-.096-.944-.015-.145-.308-.248-.308-.248s-.103-.292-.247-.308c-.144-.016-.908-.018-.945-.096-.02-.047-.018-.204-.018-.204s-.003-.157.018-.204c.037-.078.8-.08.945-.096.144-.016.247-.308.247-.308s.293-.104.309-.248c.015-.144.017-.907.095-.945.048-.02.205-.018.205-.018s.156-.003.204.018c.078.038.08.801.096.945.015.144.308.248.308.248s.103.292.247.308c.144.016.908.018.945.096.021.047.018.204.018.204s.003.157-.018.204c-.037.078-.8.08-.945.096-.144.016-.247.308-.247.308s-.293.103-.308.248z"
              display="inline"
              stopColor="#000"
              vectorEffect="none"
            ></path>
          </g>
          <g
            fillOpacity="1"
            stroke="#303030"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeMiterlimit="4"
            display="inline"
            transform="translate(88.491 -7.648)"
          >
            <ellipse
              style={{ fontVariationSettings: "normal" }}
              cx="58.593"
              cy="167.087"
              fill="#666"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.15"
              opacity="1"
              rx="2.35"
              ry="2.35"
              stopColor="#000"
              stopOpacity="1"
            ></ellipse>
            <path
              style={{ fontVariationSettings: "normal", InkscapeStroke: "none" }}
              fill="#333"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeWidth="0.1"
              d="M58.896 167.907c-.016.144-.018.907-.096.944-.048.021-.205.019-.205.019s-.156.003-.204-.019c-.078-.037-.08-.8-.096-.944-.015-.145-.308-.248-.308-.248s-.103-.292-.247-.308c-.144-.016-.908-.018-.945-.096-.02-.047-.018-.204-.018-.204s-.003-.157.018-.204c.037-.078.8-.08.945-.096.144-.016.247-.308.247-.308s.293-.104.309-.248c.015-.144.017-.907.095-.945.048-.02.205-.018.205-.018s.156-.003.204.018c.078.038.08.801.096.945.015.144.308.248.308.248s.103.292.247.308c.144.016.908.018.945.096.021.047.018.204.018.204s.003.157-.018.204c-.037.078-.8.08-.945.096-.144.016-.247.308-.247.308s-.293.103-.308.248z"
              display="inline"
              stopColor="#000"
              vectorEffect="none"
            ></path>
          </g>
          <g
            fillOpacity="1"
            stroke="#303030"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeMiterlimit="4"
            display="inline"
            transform="translate(88.491 -67.648)"
          >
            <ellipse
              style={{ fontVariationSettings: "normal" }}
              cx="58.593"
              cy="167.087"
              fill="#666"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.15"
              opacity="1"
              rx="2.35"
              ry="2.35"
              stopColor="#000"
              stopOpacity="1"
            ></ellipse>
            <path
              style={{ fontVariationSettings: "normal", InkscapeStroke: "none" }}
              fill="#333"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeWidth="0.1"
              d="M58.896 167.907c-.016.144-.018.907-.096.944-.048.021-.205.019-.205.019s-.156.003-.204-.019c-.078-.037-.08-.8-.096-.944-.015-.145-.308-.248-.308-.248s-.103-.292-.247-.308c-.144-.016-.908-.018-.945-.096-.02-.047-.018-.204-.018-.204s-.003-.157.018-.204c.037-.078.8-.08.945-.096.144-.016.247-.308.247-.308s.293-.104.309-.248c.015-.144.017-.907.095-.945.048-.02.205-.018.205-.018s.156-.003.204.018c.078.038.08.801.096.945.015.144.308.248.308.248s.103.292.247.308c.144.016.908.018.945.096.021.047.018.204.018.204s.003.157-.018.204c-.037.078-.8.08-.945.096-.144.016-.247.308-.247.308s-.293.103-.308.248z"
              display="inline"
              stopColor="#000"
              vectorEffect="none"
            ></path>
          </g>
          <g
            fillOpacity="1"
            stroke="#303030"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeMiterlimit="4"
            display="inline"
            transform="translate(.491 -67.648)"
          >
            <ellipse
              style={{ fontVariationSettings: "normal" }}
              cx="58.593"
              cy="167.087"
              fill="#666"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.15"
              opacity="1"
              rx="2.35"
              ry="2.35"
              stopColor="#000"
              stopOpacity="1"
            ></ellipse>
            <path
              style={{ fontVariationSettings: "normal", InkscapeStroke: "none" }}
              fill="#333"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeWidth="0.1"
              d="M58.896 167.907c-.016.144-.018.907-.096.944-.048.021-.205.019-.205.019s-.156.003-.204-.019c-.078-.037-.08-.8-.096-.944-.015-.145-.308-.248-.308-.248s-.103-.292-.247-.308c-.144-.016-.908-.018-.945-.096-.02-.047-.018-.204-.018-.204s-.003-.157.018-.204c.037-.078.8-.08.945-.096.144-.016.247-.308.247-.308s.293-.104.309-.248c.015-.144.017-.907.095-.945.048-.02.205-.018.205-.018s.156-.003.204.018c.078.038.08.801.096.945.015.144.308.248.308.248s.103.292.247.308c.144.016.908.018.945.096.021.047.018.204.018.204s.003.157-.018.204c-.037.078-.8.08-.945.096-.144.016-.247.308-.247.308s-.293.103-.308.248z"
              display="inline"
              stopColor="#000"
              vectorEffect="none"
            ></path>
          </g>
          <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.15">
            <path
              fill="#008484"
              fillOpacity="0"
              stroke="#303030"
              d="M106.968 144.59h-2.984"
              display="inline"
            ></path>
            <path
              fill="#4d4d4d"
              fillOpacity="0.995"
              stroke="#2e2e2e"
              strokeDasharray="none"
              strokeMiterlimit="4"
              d="M106.968 144.59v-2.062h-2.984v2.063z"
            ></path>
            <path
              fill="#008484"
              fillOpacity="0"
              stroke="#303030"
              d="M104.459 143.86h2.034"
            ></path>
            <path
              fill="#008484"
              fillOpacity="0"
              stroke="#303030"
              d="M104.459 143.86v-1.332"
            ></path>
            <path
              fill="#008484"
              fillOpacity="0"
              stroke="#303030"
              d="M106.493 142.528v1.331"
            ></path>
            <path
              fill="#f2f2f2"
              fillOpacity="0.997"
              stroke="#303030"
              d="M104.459 142.528v-.317h2.034v.317z"
            ></path>
            <path
              fill="#008484"
              fillOpacity="0"
              stroke="#303030"
              d="M104.428 142.528v2.063"
            ></path>
            <path
              fill="#008484"
              fillOpacity="0"
              stroke="#303030"
              d="M106.524 142.528v2.063"
            ></path>
            <path
              fill="#008484"
              fillOpacity="0"
              stroke="#303030"
              d="M106.524 142.528h-.03"
            ></path>
            <path
              fill="#008484"
              fillOpacity="0"
              stroke="#303030"
              d="M104.428 142.528h.03"
            ></path>
          </g>
        </g>
        <g
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="1"
          display="inline"
          transform="translate(-52.978 -88.07)"
        >
          <path
            d="M149.551 145.67l.282-.49.172-.689.037-.5v-.442l.007-.485-.01-.142.087-.603.202-.562.285-.425.286-.39.119-.109.002-.995-5.698.013c-.405 2.371 2.76 3.893 4.23 5.818z"
            style={{ fontVariationSettings: "normal", InkscapeStroke: "none" }}
            fill="#ddc580"
            fillOpacity="1"
            stroke="#303030"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeMiterlimit="4"
            strokeWidth="0.15"
            stopColor="#000"
            vectorEffect="none"
          ></path>
          <circle
            cx="136.585"
            cy="133.939"
            r="1.05"
            fill="#c2c200"
            fillOpacity="0"
            stroke="#c2c200"
            strokeWidth="0.1"
          ></circle>
          <circle
            cx="69.585"
            cy="133.939"
            r="1.05"
            fill="#c2c200"
            fillOpacity="0"
            stroke="#c2c200"
            strokeWidth="0.1"
          ></circle>
          <path
            fill="#ddc580"
            fillOpacity="1"
            stroke="#303030"
            strokeWidth="0.15"
            d="M56.616 145.683l-.282-.49-.172-.688-.038-.5.001-.442-.008-.486.01-.142-.086-.603-.202-.561-.285-.426-.286-.39-.119-.109-.002-.995 5.698.013c.405 2.372-2.76 3.893-4.23 5.819z"
            display="inline"
          ></path>
          <path
            fill="#4d4d4d"
            fillOpacity="0.995"
            stroke="#2f2f2f"
            strokeWidth="0.15"
            d="M103.984 144.59H63.44l-.063-5.298h-2.543v1.204H57.15c-.361-.003-.503.216-.508.478v14.117h7.401v-4.028h39.942v4.028h2.984v-4.028h35.144v4.028h7.401v-14.117c-.005-.262-.147-.48-.508-.478h-3.685v-1.204h-2.543l-.063 5.299h-35.746z"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M106.968 151.063h-2.984"
            display="inline"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M104.459 153.758h2.034"
          ></path>
          <path
            fill="#e6e6e6"
            fillOpacity="0.991"
            stroke="#303030"
            strokeDasharray="none"
            strokeMiterlimit="4"
            strokeWidth="0.15"
            d="M106.493 155.091v.318h-2.034v-.318z"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M59.658 137.293h3.368"
          ></path>
          <path
            d="M145.32 138.868H143c-.384-.018-.803-.497-.778-.948.026-.45.451-.86.906-.86h4.701v-.318l.732-.317-.16-.318.731-.35-.127-.285.699-.348-.127-.317.698-.35c.17-.07.74-.017.765.477l-.02 4.904-5.7.013z"
            style={{ fontVariationSettings: "normal", InkscapeStroke: "none" }}
            fill="#f5e3b5"
            fillOpacity="1"
            stroke="#303030"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeMiterlimit="4"
            strokeWidth="0.15"
            stopColor="#000"
            vectorEffect="none"
          ></path>
          <path
            fill="#f5e3b5"
            fillOpacity="1"
            stroke="#303030"
            strokeWidth="0.15"
            d="M60.847 138.881h2.32c.384-.018.803-.497.778-.948-.026-.45-.452-.86-.906-.86h-4.701v-.318l-.732-.317.16-.318-.731-.35.127-.285-.699-.348.127-.317-.698-.35c-.17-.069-.74-.016-.765.477l.02 4.904 5.7.013z"
            display="inline"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M145.32 140.496v-.411"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M148.688 151.063v4.028"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M146.526 155.091v-4.028"
          ></path>
          <path
            fill="#fff"
            fillOpacity="1"
            stroke="#303030"
            strokeWidth="0.15"
            d="M148.116 155.091h-4.003v.318h4.003z"
          ></path>
          <path
            fill="#f2f2f2"
            fillOpacity="0.98"
            stroke="#303030"
            strokeWidth="0.15"
            d="M62.04 155.091h-4.002v.318h4.003z"
            display="inline"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M59.628 151.063l-.19-5.713"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M56.671 155.091v-14.117"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M59.628 151.063v4.028"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M57.5 155.091v-4.028"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M57.5 155.091h2.128"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M57.5 155.091h-.829"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M59.628 155.091h4.414"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M104.428 155.091v-4.028"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M104.459 155.091h-.03"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M57.5 151.063l.157-5.713"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M148.497 145.35l.19 5.713"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M146.526 151.063l.19-5.713"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M141.761 151.063l-.223-6.472"
          ></path>
          <path
            style={{ fontVariationSettings: "normal", InkscapeStroke: "none" }}
            fill="#ddc580"
            fillOpacity="1"
            stroke="#303030"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeMiterlimit="4"
            strokeWidth="0.15"
            d="M148.501 145.492a.896.894 0 01-.896.895.896.894 0 01-.897-.895.896.894 0 01.897-.894.896.894 0 01.896.894z"
            stopColor="#000"
            vectorEffect="none"
          ></path>
          <path
            style={{ fontVariationSettings: "normal", InkscapeStroke: "none" }}
            fill="#ddc580"
            fillOpacity="1"
            stroke="#303030"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeMiterlimit="4"
            strokeWidth="0.15"
            d="M59.437 145.492a.896.894 0 01-.896.895.896.894 0 01-.896-.895.896.894 0 01.896-.894.896.894 0 01.896.894z"
            display="inline"
            stopColor="#000"
            vectorEffect="none"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M106.524 151.063v4.028"
          ></path>
          <path
            fill="#008484"
            fillOpacity="0"
            stroke="#303030"
            strokeWidth="0.15"
            d="M106.493 155.091h.03"
          ></path>
        </g>
        
      </svg>
    )
  }
  render() {
    return (
      this.renderAdaptor()
    );
  }
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
  render() {
    return (
      <React.Fragment>
        <HeaderTop />
          <div class ="mn" >
          <ResizableBox width={'400'} height={'100%'} lockAspectRatio={false}
          axis="x"
          handleSize={[20, 20]}
          minConstraints={[100, 100]} maxConstraints={[800, 800]}>
            <CartridgeComponent />
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
