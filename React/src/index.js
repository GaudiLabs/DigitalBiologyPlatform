import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

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
            serialPort : null
        };
    }

    handleHover(i, j, e) {
        console.log("MOUSE ENTER")
        console.log(e)
        if(e.type === "click" || e.buttons === 1 || e.buttons === 3){
            var newArray = this.state.squares.map(function(arr) {
                return arr.slice();
            });
    
            if (newArray[i][j] != null)
            {
                newArray[i][j] = null;
            } else {
                newArray[i][j] = '🟦';
            }
            console.log(i,j)
            
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
            serialPort : port
        })
        await port.open({ baudRate: 115200 });
        console.log("serial connected successfully.")
    }

    bit_set(num, bit){
        return num | 1 << bit;
    }
    
    dec2bin(dec){
        return (dec >>> 0).toString(2);
    }

    squaresToBytes(squares) {
        let output = new Uint8Array(32);

        for (let i = 0; i < 16; i++) {
            let byte = 0
            for (let j = 0; j < 8; j++) {
                if (squares[j][i] != null)
                {
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

    renderRow(board,i) {
        let cells = [];
            for (let j = 0; j < 16; j++) {
                cells.push(this.renderSquare(i,j));
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
                rows.push(this.renderRow(board,i));
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
                <SelectSerial onClick={() => this.SelectSerialClick()}/>
                <Send onClick={() => this.SendClick(this.state.serialPort, this.state.squares)}/>
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

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
