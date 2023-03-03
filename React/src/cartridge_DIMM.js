import * as React from "react"
import './cartridge_DIMM.scss';

class CartridgeComponent extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            a : "b"
          }
    }

    componentDidMount() {
        //console.log("HERE - LINKING EVNET LISTENERS");
        ////console.log(this.state.instanciatedHooks);

        var electrodes = document.getElementsByClassName("electrode");

                    //onMouseEnter={(e) => this.handleHover(0, e)}
                    //onClick={(e) => this.handleHover(0, e)}
                    //fill={this.renderElectrodeFill(0)}

        for (var i = 0; i < electrodes.length; i++) {
            let current_electrode = electrodes[i];
            //console.log(current_electrode)
            let current_electrode_id = current_electrode.getAttribute("electrode_id")
            //console.log(current_electrode_id)
            
            //console.log(this.props.state);
            current_electrode.addEventListener('mousedown', (e) => {this.props.state.clickHandle(current_electrode_id, e)}, false);
            current_electrode.addEventListener('mouseenter', (e) => {this.props.state.clickHandle(current_electrode_id, e)}, false);
            current_electrode.addEventListener('mouseup', (e) => {this.props.state.resetClickAction(e)}, false);
            
        }
    }

    componentWillUnmount() {
        //TO-DO
    }

    renderCartridge() {
        return (
            <g>
                <g
                    style={{
                        display: "inline",
                    }}
                    transform="translate(-53.01 -88.215)"
                >
                    <path
                        d="M105.49 147.955v-3.249c0-.317.216-.545.488-.547.282-.003.501.197.505.547l-.003 3.249h37.592l.003-8.994h-.866c-.723-.008-1.135-.449-1.13-1.016.005-.546.474-.979 1.13-.98h.871v-7.011c-1.073 0-1.997-.896-1.988-2.028.01-1.09.915-1.957 1.988-1.957l.008-31.54a1 1 0 0 0-1.001-.998h-80a1 1 0 0 0-1 .999v31.539c1.072 0 1.978.867 1.987 1.957.009 1.132-.915 2.028-1.988 2.028v7.01h.87c.655.002 1.125.435 1.13.981.005.567-.408 1.008-1.13 1.016h-.867v8.994h43.4"
                        style={{
                            fill: "red",
                            fillOpacity: 1,
                            stroke: "#2a0606",
                            strokeWidth: 0.1,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                    />
                    <circle
                        cx={142.092}
                        cy={141.957}
                        r={0.9}
                        style={{
                            fill: "#2e2e2e",
                            fillOpacity: 0.0793651,
                            stroke: "#000",
                            strokeWidth: 0.1,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                    />
                    <circle
                        cx={64.092}
                        cy={141.957}
                        r={0.9}
                        style={{
                            fill: "#2e2e2e",
                            fillOpacity: 0.0793651,
                            stroke: "#000",
                            strokeWidth: 0.1,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                    />
                    <path
                        d="m142.475 142.88-.188.058M143.062 142.161l-.056.188M142.912 142.52l-.12.147M143.006 142.35l-.094.17M141.383 142.667l-.122-.148M141.53 142.789l-.147-.122M141.698 141.044l.188-.059M141.53 141.135l.168-.091M141.886 142.938l-.188-.058M63.53 141.135l.17-.091M63.382 141.257l.147-.122M64.913 141.404l.092.17M64.792 141.257l.121.147M64.644 142.789l-.17.091M64.792 142.667l-.148.122M141.383 141.257l.147-.122M141.26 141.404l.123-.147M64.289 142.938l-.204.02M64.474 142.88l-.185.058M141.17 142.35l-.06-.189M141.26 142.52l-.09-.17M64.289 140.985l.185.059M64.085 140.965l.204.02M143.062 141.76l.02.2M64.644 141.135l.148.122M64.474 141.044l.17.091M143.006 141.574l.056.186M142.912 141.404l.094.17M142.086 142.959l-.2-.02M142.287 142.938l-.2.02M63.26 142.52l-.092-.17M63.382 142.667l-.122-.148M142.643 142.789l-.168.091M64.913 142.52l-.121.147M65.005 142.35l-.092.17M63.885 140.985l.2-.02M63.7 141.044l.185-.059M63.11 142.161l-.02-.2M63.168 142.35l-.058-.189M141.17 141.574l.09-.17M141.11 141.76l.06-.186M141.09 141.96l.02-.2M141.11 142.161l-.02-.2M141.698 142.88l-.168-.091M143.082 141.96l-.02.201M63.11 141.76l.058-.186M63.09 141.96l.02-.2M65.063 142.161l-.058.188M65.084 141.96l-.02.201M65.063 141.76l.02.2M65.005 141.574l.058.186M142.475 141.044l.168.091M142.287 140.985l.188.059M142.792 141.257l.12.147M142.643 141.135l.15.122M63.53 142.789l-.148-.122M63.7 142.88l-.17-.091M63.885 142.938l-.186-.058M64.085 142.959l-.2-.02M63.26 141.404l.122-.147M63.168 141.574l.092-.17M142.086 140.965l.2.02M141.886 140.985l.2-.02M142.792 142.667l-.15.122"
                        style={{
                            fill: "#2e2e2e",
                            fillOpacity: 0.0793651,
                            stroke: "#000",
                            strokeWidth: 0.1,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                    />
                    <path
                        d="M63.06 93.406a.999.999 0 0 0-.999.999v31.539a1.993 1.993 0 0 1 1.987 1.992 1.993 1.993 0 0 1-1.987 1.994v5.506l6.426.001a8.568 8.568 0 0 1 6.457 2.937l.132.153a12.856 12.856 0 0 0 9.685 4.406h36.566c3.715 0 7.246-1.605 9.687-4.404l.134-.156a8.579 8.579 0 0 1 6.46-2.936h6.427l.003-5.508a1.993 1.993 0 0 1-1.974-1.993 1.993 1.993 0 0 1 1.975-1.992l.01-31.54a.999.999 0 0 0-.998-.998z"
                        style={{
                            display: "inline",
                            vectorEffect: "none",
                            fill: "#fff",
                            fillOpacity: 1,
                            stroke: "#000",
                            strokeWidth: 0.1,
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeDashoffset: 0,
                            strokeOpacity: 1,
                        }}
                    />
                    <path
                        d="M70.124 101.09h4.351a2.1 2.1 0 0 1 2.049-1.638h53.064a2.1 2.1 0 0 1 2.049 1.639h4.351c1.16 0 2.1.94 2.1 2.1v22.384a2.1 2.1 0 0 1-2.1 2.1h-4.351a2.1 2.1 0 0 1-2.049 1.639H76.524a2.1 2.1 0 0 1-2.049-1.64h-4.351a2.1 2.1 0 0 1-2.1-2.1v-22.383c0-1.16.94-2.1 2.1-2.1"
                        style={{
                            display: "inline",
                            fill: "red",
                            stroke: "#000",
                            strokeWidth: 0.1,
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                    />
                    <path
                        d="M70.124 112.89a.8.8 0 0 1-.8-.8v-8.9a.8.8 0 0 1 .8-.8h4.8c.442 0 .8-.357.8-.819 0-.461.358-.82.8-.82h53.064c.442 0 .8.359.8.82 0 .462.358.82.8.82h4.8a.8.8 0 0 1 .8.8v8.9a.8.8 0 0 1-.8.8h-4.8a.8.8 0 0 0-.8.8v1.384a.8.8 0 0 0 .8.8h4.8a.8.8 0 0 1 .8.8v8.9a.8.8 0 0 1-.8.8h-4.8c-.442 0-.8.358-.8.82 0 .46-.358.819-.8.819H76.524a.804.804 0 0 1-.8-.82.804.804 0 0 0-.8-.82h-4.8a.8.8 0 0 1-.8-.8v-8.9a.8.8 0 0 1 .8-.8h4.8a.8.8 0 0 0 .8-.8v-1.383a.8.8 0 0 0-.8-.8z"
                        style={{
                            display: "inline",
                            fill: "#ba9b86",
                            fillOpacity: 1,
                            stroke: "#000",
                            strokeWidth: 0.1,
                            strokeLinecap: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                    />
                </g>

                <g
                    style={{
                        display: "inline",
                    }}
                >
                    <path
                        d="M130.388 115.309a.8.8 0 0 0 .8.8M136.788 116.909a.8.8 0 0 0-.8-.8M135.988 126.609a.8.8 0 0 0 .8-.8M129.588 128.248a.8.8 0 0 0 .8-.8M130.388 101.786a.8.8 0 0 0-.8-.8M136.788 103.425a.8.8 0 0 0-.8-.8M135.988 113.125a.8.8 0 0 0 .8-.8M131.188 113.125a.8.8 0 0 0-.8.8M131.188 126.609a.8.8 0 0 0-.8.8M130.388 101.825a.8.8 0 0 0 .8.8"
                        style={{
                            display: "inline",
                            fill: "none",
                            stroke: "#000",
                            strokeWidth: 0.1,
                            strokeLinecap: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                        transform="translate(-53.01 -88.449)"
                    />
                    <path
                        d="M131.188 101.786a1.6 1.6 0 0 0-1.6-1.6M137.588 103.425a1.6 1.6 0 0 0-1.6-1.6M135.988 113.925a1.6 1.6 0 0 0 1.6-1.6M137.588 116.909a1.6 1.6 0 0 0-1.6-1.6M135.988 127.409a1.6 1.6 0 0 0 1.6-1.6M129.588 129.048a1.6 1.6 0 0 0 1.6-1.6M74.924 127.448a1.6 1.6 0 0 0 1.6 1.6M68.524 125.809a1.6 1.6 0 0 0 1.6 1.6M70.124 115.309a1.6 1.6 0 0 0-1.6 1.6M68.524 112.325a1.6 1.6 0 0 0 1.6 1.6M70.124 101.825a1.6 1.6 0 0 0-1.6 1.6M76.524 100.186a1.6 1.6 0 0 0-1.6 1.6"
                        style={{
                            display: "inline",
                            fill: "none",
                            stroke: "#000",
                            strokeWidth: 0.1,
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                        transform="translate(-53.01 -88.449)"
                    />
                    <path
                        d="M75.724 101.825v-.04M135.988 126.609h-4.8M76.524 128.248h53.064M136.788 125.809v-8.9M135.988 102.625h-4.8M75.724 127.409v.039M130.388 113.925v1.384M130.388 127.409v.039M130.388 101.786v.039M135.988 116.109h-4.8M136.788 103.425v8.9M135.988 113.125h-4.8M108.106 100.986h21.482"
                        style={{
                            display: "inline",
                            fill: "none",
                            stroke: "#000",
                            strokeWidth: 0.1,
                            strokeLinecap: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                        transform="translate(-53.01 -88.449)"
                    />
                    <path
                        d="M76.524 100.186h53.064M131.188 101.786v.039M135.988 101.825h-4.8M137.588 103.425v8.9M135.988 113.925h-4.8M131.188 113.925v1.384M135.988 115.309h-4.8M137.588 125.809v-8.9M135.988 127.409h-4.8M131.188 127.409v.039M76.524 129.048h53.064M74.924 127.409v.039M70.124 127.409h4.8M68.524 125.809v-8.9M70.124 115.309h4.8M74.924 113.925v1.384M70.124 113.925h4.8M68.524 103.425v8.9M70.124 101.825h4.8M74.924 101.825v-.04"
                        style={{
                            display: "inline",
                            fill: "none",
                            stroke: "#000",
                            strokeWidth: 0.1,
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                        transform="translate(-53.01 -88.449)"
                    />
                    <path
                        d="M75.724 127.409v.039M130.388 127.448v-.04M130.388 101.825v-.04M75.724 101.786v.039"
                        style={{
                            display: "inline",
                            fill: "none",
                            stroke: "#000",
                            strokeWidth: 0.1,
                            strokeLinecap: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                        transform="translate(-53.01 -88.449)"
                    />
                    <path
                        style={{
                            display: "inline",
                            fill: "none",
                            stroke: "#000",
                            strokeWidth: ".264583px",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeOpacity: 1,
                        }}
                        d="M68.5 130.084h-.02"
                        transform="translate(-53.01 -88.449)"
                    />
                    <path
                        style={{
                            display: "inline",
                            fill: "#c20000",
                            fillOpacity: 0,
                            stroke: "#007dc2",
                            strokeWidth: 0,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                            stopColor: "#000",
                        }}
                        fill="none"
                        d="M68.543 121.721h8.484v8.31h-8.484z"
                        transform="translate(-53.01 -88.449)"
                    />
                </g>
            </g>
        )
    }

    renderElectrodes() {
        return (
            <g
                fill="#efd94c"
                fillOpacity="1"
                strokeLinejoin="round"
                display="inline"
                transform="translate(-53.01 -88.215)"
            >
                <path
                   className={"electrode" +  this.renderFeedbackClass(2)}
                    electrode_id="2"
                    fill={this.renderElectrodeFill(2)}
                    strokeWidth="2.185"
                    d="M291.275 402.52v9.636h14.834v-9.636h-9.638z"
                    display="inline"
                    stopColor="#000"
                    transform="scale(.26458)"
                ></path>
               <path
                   className={"electrode" +  this.renderFeedbackClass(3)}
                    electrode_id="3"
                    fill={this.renderElectrodeFill(3)}
                    strokeWidth="2.535"
                    d="M266.639 392.125v30.426H300.912v-9.639H290.52v-11.148h10.392v-9.639h-12.98z"
                    display="inline"
                    stopColor="#000"
                    transform="scale(.26458)"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(17)}
                    electrode_id="17"
                    fill={this.renderElectrodeFill(17)}
                    strokeWidth="0.578"
                    d="M86.691 106.5H89.241V109.05H86.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(9)}
                    electrode_id="9"
                    fill={this.renderElectrodeFill(9)}
                    strokeWidth="0.578"
                    d="M83.941 106.5H86.491V109.05H83.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(25)}
                    electrode_id="25"
                    fill={this.renderElectrodeFill(25)}
                    strokeWidth="0.578"
                    d="M89.441 106.5H91.991V109.05H89.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(33)}
                    electrode_id="33"
                    fill={this.renderElectrodeFill(33)}
                    strokeWidth="0.578"
                    d="M92.191 106.5H94.741V109.05H92.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(41)}
                    electrode_id="41"
                    fill={this.renderElectrodeFill(41)}
                    strokeWidth="0.578"
                    d="M94.941 106.5H97.491V109.05H94.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(49)}
                    electrode_id="49"
                    fill={this.renderElectrodeFill(49)}
                    strokeWidth="0.578"
                    d="M97.691 106.5H100.241V109.05H97.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(57)}
                    electrode_id="57"
                    fill={this.renderElectrodeFill(57)}
                    strokeWidth="0.578"
                    d="M100.441 106.5H102.991V109.05H100.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(65)}
                    electrode_id="65"
                    fill={this.renderElectrodeFill(65)}
                    strokeWidth="0.578"
                    d="M103.191 106.5H105.741V109.05H103.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(73)}
                    electrode_id="73"
                    fill={this.renderElectrodeFill(73)}
                    strokeWidth="0.578"
                    d="M105.941 106.5H108.491V109.05H105.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(81)}
                    electrode_id="81"
                    fill={this.renderElectrodeFill(81)}
                    strokeWidth="0.578"
                    d="M108.691 106.5H111.241V109.05H108.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(89)}
                    electrode_id="89"
                    fill={this.renderElectrodeFill(89)}
                    strokeWidth="0.578"
                    d="M111.441 106.5H113.991V109.05H111.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(97)}
                    electrode_id="97"
                    fill={this.renderElectrodeFill(97)}
                    strokeWidth="0.578"
                    d="M114.191 106.5H116.741V109.05H114.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(105)}
                    electrode_id="105"
                    fill={this.renderElectrodeFill(105)}
                    strokeWidth="0.578"
                    d="M116.941 106.5H119.491V109.05H116.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(113)}
                    electrode_id="113"
                    fill={this.renderElectrodeFill(113)}
                    strokeWidth="0.578"
                    d="M119.691 106.5H122.241V109.05H119.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(16)}
                    electrode_id="16"
                    fill={this.renderElectrodeFill(16)}
                    strokeWidth="0.578"
                    d="M86.691 103.75H89.241V106.3H86.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(8)}
                    electrode_id="8"
                    fill={this.renderElectrodeFill(8)}
                    strokeWidth="0.578"
                    d="M83.941 103.75H86.491V106.3H83.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(24)}
                    electrode_id="24"
                    fill={this.renderElectrodeFill(24)}
                    strokeWidth="0.578"
                    d="M89.441 103.75H91.991V106.3H89.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(32)}
                    electrode_id="32"
                    fill={this.renderElectrodeFill(32)}
                    strokeWidth="0.578"
                    d="M92.191 103.75H94.741V106.3H92.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(40)}
                    electrode_id="40"
                    fill={this.renderElectrodeFill(40)}
                    strokeWidth="0.578"
                    d="M94.941 103.75H97.491V106.3H94.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(48)}
                    electrode_id="48"
                    fill={this.renderElectrodeFill(48)}
                    strokeWidth="0.578"
                    d="M97.691 103.75H100.241V106.3H97.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(56)}
                    electrode_id="56"
                    fill={this.renderElectrodeFill(56)}
                    strokeWidth="0.578"
                    d="M100.441 103.75H102.991V106.3H100.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(64)}
                    electrode_id="64"
                    fill={this.renderElectrodeFill(64)}
                    strokeWidth="0.578"
                    d="M103.191 103.75H105.741V106.3H103.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(72)}
                    electrode_id="72"
                    fill={this.renderElectrodeFill(72)}
                    strokeWidth="0.578"
                    d="M105.941 103.75H108.491V106.3H105.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(80)}
                    electrode_id="80"
                    fill={this.renderElectrodeFill(80)}
                    strokeWidth="0.578"
                    d="M108.691 103.75H111.241V106.3H108.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(88)}
                    electrode_id="88"
                    fill={this.renderElectrodeFill(88)}
                    strokeWidth="0.578"
                    d="M111.441 103.75H113.991V106.3H111.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(96)}
                    electrode_id="96"
                    fill={this.renderElectrodeFill(96)}
                    strokeWidth="0.578"
                    d="M114.191 103.75H116.741V106.3H114.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(104)}
                    electrode_id="104"
                    fill={this.renderElectrodeFill(104)}
                    strokeWidth="0.578"
                    d="M116.941 103.75H119.491V106.3H116.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(112)}
                    electrode_id="112"
                    fill={this.renderElectrodeFill(112)}
                    strokeWidth="0.578"
                    d="M119.691 103.75H122.241V106.3H119.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(18)}
                    electrode_id="18"
                    fill={this.renderElectrodeFill(18)}
                    strokeWidth="0.578"
                    d="M86.691 109.25H89.241V111.8H86.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(10)}
                    electrode_id="10"
                    fill={this.renderElectrodeFill(10)}
                    strokeWidth="0.578"
                    d="M83.941 109.25H86.491V111.8H83.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(26)}
                    electrode_id="26"
                    fill={this.renderElectrodeFill(26)}
                    strokeWidth="0.578"
                    d="M89.441 109.25H91.991V111.8H89.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(34)}
                    electrode_id="34"
                    fill={this.renderElectrodeFill(34)}
                    strokeWidth="0.578"
                    d="M92.191 109.25H94.741V111.8H92.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(42)}
                    electrode_id="42"
                    fill={this.renderElectrodeFill(42)}
                    strokeWidth="0.578"
                    d="M94.941 109.25H97.491V111.8H94.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(50)}
                    electrode_id="50"
                    fill={this.renderElectrodeFill(50)}
                    strokeWidth="0.578"
                    d="M97.691 109.25H100.241V111.8H97.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(58)}
                    electrode_id="58"
                    fill={this.renderElectrodeFill(58)}
                    strokeWidth="0.578"
                    d="M100.441 109.25H102.991V111.8H100.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(66)}
                    electrode_id="66"
                    fill={this.renderElectrodeFill(66)}
                    strokeWidth="0.578"
                    d="M103.191 109.25H105.741V111.8H103.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(74)}
                    electrode_id="74"
                    fill={this.renderElectrodeFill(74)}
                    strokeWidth="0.578"
                    d="M105.941 109.25H108.491V111.8H105.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(82)}
                    electrode_id="82"
                    fill={this.renderElectrodeFill(82)}
                    strokeWidth="0.578"
                    d="M108.691 109.25H111.241V111.8H108.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(90)}
                    electrode_id="90"
                    fill={this.renderElectrodeFill(90)}
                    strokeWidth="0.578"
                    d="M111.441 109.25H113.991V111.8H111.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(98)}
                    electrode_id="98"
                    fill={this.renderElectrodeFill(98)}
                    strokeWidth="0.578"
                    d="M114.191 109.25H116.741V111.8H114.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(106)}
                    electrode_id="106"
                    fill={this.renderElectrodeFill(106)}
                    strokeWidth="0.578"
                    d="M116.941 109.25H119.491V111.8H116.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(114)}
                    electrode_id="114"
                    fill={this.renderElectrodeFill(114)}
                    strokeWidth="0.578"
                    d="M119.691 109.25H122.241V111.8H119.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(19)}
                    electrode_id="19"
                    fill={this.renderElectrodeFill(19)}
                    strokeWidth="0.578"
                    d="M86.691 112H89.241V114.55H86.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(11)}
                    electrode_id="11"
                    fill={this.renderElectrodeFill(11)}
                    strokeWidth="0.578"
                    d="M83.941 112H86.491V114.55H83.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(27)}
                    electrode_id="27"
                    fill={this.renderElectrodeFill(27)}
                    strokeWidth="0.578"
                    d="M89.441 112H91.991V114.55H89.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(35)}
                    electrode_id="35"
                    fill={this.renderElectrodeFill(35)}
                    strokeWidth="0.578"
                    d="M92.191 112H94.741V114.55H92.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(43)}
                    electrode_id="43"
                    fill={this.renderElectrodeFill(43)}
                    strokeWidth="0.578"
                    d="M94.941 112H97.491V114.55H94.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(51)}
                    electrode_id="51"
                    fill={this.renderElectrodeFill(51)}
                    strokeWidth="0.578"
                    d="M97.691 112H100.241V114.55H97.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(59)}
                    electrode_id="59"
                    fill={this.renderElectrodeFill(59)}
                    strokeWidth="0.578"
                    d="M100.441 112H102.991V114.55H100.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(67)}
                    electrode_id="67"
                    fill={this.renderElectrodeFill(67)}
                    strokeWidth="0.578"
                    d="M103.191 112H105.741V114.55H103.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(75)}
                    electrode_id="75"
                    fill={this.renderElectrodeFill(75)}
                    strokeWidth="0.578"
                    d="M105.941 112H108.491V114.55H105.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(83)}
                    electrode_id="83"
                    fill={this.renderElectrodeFill(83)}
                    strokeWidth="0.578"
                    d="M108.691 112H111.241V114.55H108.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(91)}
                    electrode_id="91"
                    fill={this.renderElectrodeFill(91)}
                    strokeWidth="0.578"
                    d="M111.441 112H113.991V114.55H111.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(99)}
                    electrode_id="99"
                    fill={this.renderElectrodeFill(99)}
                    strokeWidth="0.578"
                    d="M114.191 112H116.741V114.55H114.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(107)}
                    electrode_id="107"
                    fill={this.renderElectrodeFill(107)}
                    strokeWidth="0.578"
                    d="M116.941 112H119.491V114.55H116.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(115)}
                    electrode_id="115"
                    fill={this.renderElectrodeFill(115)}
                    strokeWidth="0.578"
                    d="M119.691 112H122.241V114.55H119.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(20)}
                    electrode_id="20"
                    fill={this.renderElectrodeFill(20)}
                    strokeWidth="0.578"
                    d="M86.691 114.75H89.241V117.3H86.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(12)}
                    electrode_id="12"
                    fill={this.renderElectrodeFill(12)}
                    strokeWidth="0.578"
                    d="M83.941 114.75H86.491V117.3H83.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(28)}
                    electrode_id="28"
                    fill={this.renderElectrodeFill(28)}
                    strokeWidth="0.578"
                    d="M89.441 114.75H91.991V117.3H89.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(36)}
                    electrode_id="36"
                    fill={this.renderElectrodeFill(36)}
                    strokeWidth="0.578"
                    d="M92.191 114.75H94.741V117.3H92.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(44)}
                    electrode_id="44"
                    fill={this.renderElectrodeFill(44)}
                    strokeWidth="0.578"
                    d="M94.941 114.75H97.491V117.3H94.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(52)}
                    electrode_id="52"
                    fill={this.renderElectrodeFill(52)}
                    strokeWidth="0.578"
                    d="M97.691 114.75H100.241V117.3H97.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(60)}
                    electrode_id="60"
                    fill={this.renderElectrodeFill(60)}
                    strokeWidth="0.578"
                    d="M100.441 114.75H102.991V117.3H100.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(68)}
                    electrode_id="68"
                    fill={this.renderElectrodeFill(68)}
                    strokeWidth="0.578"
                    d="M103.191 114.75H105.741V117.3H103.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(76)}
                    electrode_id="76"
                    fill={this.renderElectrodeFill(76)}
                    strokeWidth="0.578"
                    d="M105.941 114.75H108.491V117.3H105.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(84)}
                    electrode_id="84"
                    fill={this.renderElectrodeFill(84)}
                    strokeWidth="0.578"
                    d="M108.691 114.75H111.241V117.3H108.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(92)}
                    electrode_id="92"
                    fill={this.renderElectrodeFill(92)}
                    strokeWidth="0.578"
                    d="M111.441 114.75H113.991V117.3H111.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(100)}
                    electrode_id="100"
                    fill={this.renderElectrodeFill(100)}
                    strokeWidth="0.578"
                    d="M114.191 114.75H116.741V117.3H114.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(108)}
                    electrode_id="108"
                    fill={this.renderElectrodeFill(108)}
                    strokeWidth="0.578"
                    d="M116.941 114.75H119.491V117.3H116.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(116)}
                    electrode_id="116"
                    fill={this.renderElectrodeFill(116)}
                    strokeWidth="0.578"
                    d="M119.691 114.75H122.241V117.3H119.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(21)}
                    electrode_id="21"
                    fill={this.renderElectrodeFill(21)}
                    strokeWidth="0.578"
                    d="M86.691 117.5H89.241V120.05H86.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(13)}
                    electrode_id="13"
                    fill={this.renderElectrodeFill(13)}
                    strokeWidth="0.578"
                    d="M83.941 117.5H86.491V120.05H83.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(29)}
                    electrode_id="29"
                    fill={this.renderElectrodeFill(29)}
                    strokeWidth="0.578"
                    d="M89.441 117.5H91.991V120.05H89.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(37)}
                    electrode_id="37"
                    fill={this.renderElectrodeFill(37)}
                    strokeWidth="0.578"
                    d="M92.191 117.5H94.741V120.05H92.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(45)}
                    electrode_id="45"
                    fill={this.renderElectrodeFill(45)}
                    strokeWidth="0.578"
                    d="M94.941 117.5H97.491V120.05H94.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(53)}
                    electrode_id="53"
                    fill={this.renderElectrodeFill(53)}
                    strokeWidth="0.578"
                    d="M97.691 117.5H100.241V120.05H97.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(61)}
                    electrode_id="61"
                    fill={this.renderElectrodeFill(61)}
                    strokeWidth="0.578"
                    d="M100.441 117.5H102.991V120.05H100.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(69)}
                    electrode_id="69"
                    fill={this.renderElectrodeFill(69)}
                    strokeWidth="0.578"
                    d="M103.191 117.5H105.741V120.05H103.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(77)}
                    electrode_id="77"
                    fill={this.renderElectrodeFill(77)}
                    strokeWidth="0.578"
                    d="M105.941 117.5H108.491V120.05H105.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(85)}
                    electrode_id="85"
                    fill={this.renderElectrodeFill(85)}
                    strokeWidth="0.578"
                    d="M108.691 117.5H111.241V120.05H108.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(93)}
                    electrode_id="93"
                    fill={this.renderElectrodeFill(93)}
                    strokeWidth="0.578"
                    d="M111.441 117.5H113.991V120.05H111.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(101)}
                    electrode_id="101"
                    fill={this.renderElectrodeFill(101)}
                    strokeWidth="0.578"
                    d="M114.191 117.5H116.741V120.05H114.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(109)}
                    electrode_id="109"
                    fill={this.renderElectrodeFill(109)}
                    strokeWidth="0.578"
                    d="M116.941 117.5H119.491V120.05H116.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(117)}
                    electrode_id="117"
                    fill={this.renderElectrodeFill(117)}
                    strokeWidth="0.578"
                    d="M119.691 117.5H122.241V120.05H119.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(22)}
                    electrode_id="22"
                    fill={this.renderElectrodeFill(22)}
                    strokeWidth="0.578"
                    d="M86.691 120.25H89.241V122.8H86.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(14)}
                    electrode_id="14"
                    fill={this.renderElectrodeFill(14)}
                    strokeWidth="0.578"
                    d="M83.941 120.25H86.491V122.8H83.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(0)}
                    electrode_id="0"
                    fill={this.renderElectrodeFill(0)}
                    strokeWidth="0.578"
                    d="M81.191 106.5H83.741V109.05H81.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(7)}
                    electrode_id="7"
                    fill={this.renderElectrodeFill(7)}
                    strokeWidth="0.578"
                    d="M81.191 120.25H83.741V122.8H81.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(5)}
                    electrode_id="5"
                    fill={this.renderElectrodeFill(5)}
                    strokeWidth="2.185"
                    d="M291.275 454.486v9.639h14.834v-9.639h-9.638z"
                    display="inline"
                    stopColor="#000"
                    transform="scale(.26458)"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(30)}
                    electrode_id="30"
                    fill={this.renderElectrodeFill(30)}
                    strokeWidth="0.578"
                    d="M89.441 120.25H91.991V122.8H89.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(38)}
                    electrode_id="38"
                    fill={this.renderElectrodeFill(38)}
                    strokeWidth="0.578"
                    d="M92.191 120.25H94.741V122.8H92.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(46)}
                    electrode_id="46"
                    fill={this.renderElectrodeFill(46)}
                    strokeWidth="0.578"
                    d="M94.941 120.25H97.491V122.8H94.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(54)}
                    electrode_id="54"
                    fill={this.renderElectrodeFill(54)}
                    strokeWidth="0.578"
                    d="M97.691 120.25H100.241V122.8H97.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(62)}
                    electrode_id="62"
                    fill={this.renderElectrodeFill(62)}
                    strokeWidth="0.578"
                    d="M100.441 120.25H102.991V122.8H100.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(70)}
                    electrode_id="70"
                    fill={this.renderElectrodeFill(70)}
                    strokeWidth="0.578"
                    d="M103.191 120.25H105.741V122.8H103.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(78)}
                    electrode_id="78"
                    fill={this.renderElectrodeFill(78)}
                    strokeWidth="0.578"
                    d="M105.941 120.25H108.491V122.8H105.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(86)}
                    electrode_id="86"
                    fill={this.renderElectrodeFill(86)}
                    strokeWidth="0.578"
                    d="M108.691 120.25H111.241V122.8H108.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(94)}
                    electrode_id="94"
                    fill={this.renderElectrodeFill(94)}
                    strokeWidth="0.578"
                    d="M111.441 120.25H113.991V122.8H111.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(102)}
                    electrode_id="102"
                    fill={this.renderElectrodeFill(102)}
                    strokeWidth="0.578"
                    d="M114.191 120.25H116.741V122.8H114.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(110)}
                    electrode_id="110"
                    fill={this.renderElectrodeFill(110)}
                    strokeWidth="0.578"
                    d="M116.941 120.25H119.491V122.8H116.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(118)}
                    electrode_id="118"
                    fill={this.renderElectrodeFill(118)}
                    strokeWidth="0.578"
                    d="M119.691 120.25H122.241V122.8H119.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(120)}
                    electrode_id="120"
                    fill={this.renderElectrodeFill(120)}
                    strokeWidth="0.578"
                    d="M122.441 106.5H124.991V109.05H122.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(127)}
                    electrode_id="127"
                    fill={this.renderElectrodeFill(127)}
                    strokeWidth="0.578"
                    d="M122.441 120.25H124.991V122.8H122.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(122)}
                    electrode_id="122"
                    fill={this.renderElectrodeFill(122)}
                    strokeWidth="2.185"
                    d="M473.162 402.52v9.636H487.998v-9.636h-9.639z"
                    display="inline"
                    stopColor="#000"
                    transform="scale(.26458)"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(125)}
                    electrode_id="125"
                    fill={this.renderElectrodeFill(125)}
                    strokeWidth="2.185"
                    d="M473.162 454.486v9.639H487.998v-9.639h-9.639z"
                    display="inline"
                    stopColor="#000"
                    transform="scale(.26458)"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(23)}
                    electrode_id="23"
                    fill={this.renderElectrodeFill(23)}
                    strokeWidth="0.578"
                    d="M86.691 123H89.241V125.55H86.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(15)}
                    electrode_id="15"
                    fill={this.renderElectrodeFill(15)}
                    strokeWidth="0.578"
                    d="M83.941 123H86.491V125.55H83.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(1)}
                    electrode_id="1"
                    fill={this.renderElectrodeFill(1)}  
                    strokeWidth="0.578"
                    d="M79.816 103.75H82.366V106.3H79.816z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(1)}
                    electrode_id="1"
                    fill={this.renderElectrodeFill(1)}  
                    strokeWidth="0.578"
                    d="M79.816 109.25H82.366V111.8H79.816z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(6)}
                    electrode_id="6"
                    fill={this.renderElectrodeFill(6)}
                    strokeWidth="0.578"
                    d="M79.816 117.5H82.366V120.05H79.816z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(6)}
                    electrode_id="6"
                    fill={this.renderElectrodeFill(6)}
                    strokeWidth="0.578"
                    d="M79.816 123H82.366V125.55H79.816z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(4)}
                    electrode_id="4"
                    fill={this.renderElectrodeFill(4)}
                    strokeWidth="0.671"
                    d="M70.548 117.5v8.05h9.069V123h-2.75v-2.95h2.75v-2.55h-3.435z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(123)}
                    electrode_id="123"
                    fill={this.renderElectrodeFill(123)}
                    strokeWidth="0.671"
                    d="M135.634 103.749v8.05h-9.069v-2.55h2.75v-2.95h-2.75v-2.55H130z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(124)}
                    electrode_id="124"
                    fill={this.renderElectrodeFill(124)}
                    strokeWidth="0.671"
                    d="M135.634 117.5v8.05h-9.069V123h2.75v-2.95h-2.75v-2.55H130z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path

                   className={"electrode" +  this.renderFeedbackClass(31)}
                    electrode_id="31"
                    fill={this.renderElectrodeFill(31)}
                    strokeWidth="0.578"
                    d="M89.441 123H91.991V125.55H89.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(39)}
                    electrode_id="39"
                    fill={this.renderElectrodeFill(39)}
                    strokeWidth="0.578"
                    d="M92.191 123H94.741V125.55H92.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(47)}
                    electrode_id="47"
                    fill={this.renderElectrodeFill(47)}
                    strokeWidth="0.578"
                    d="M94.941 123H97.491V125.55H94.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(55)}
                    electrode_id="55"
                    fill={this.renderElectrodeFill(55)}
                    strokeWidth="0.578"
                    d="M97.691 123H100.241V125.55H97.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(63)}
                    electrode_id="63"
                    fill={this.renderElectrodeFill(63)}
                    strokeWidth="0.578"
                    d="M100.441 123H102.991V125.55H100.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(71)}
                    electrode_id="71"
                    fill={this.renderElectrodeFill(71)}
                    strokeWidth="0.578"
                    d="M103.191 123H105.741V125.55H103.191z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(79)}
                    electrode_id="79"
                    fill={this.renderElectrodeFill(79)}
                    strokeWidth="0.578"
                    d="M105.941 123H108.491V125.55H105.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(87)}
                    electrode_id="87"
                    fill={this.renderElectrodeFill(87)}
                    strokeWidth="0.578"
                    d="M108.691 123H111.241V125.55H108.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(95)}
                    electrode_id="95"
                    fill={this.renderElectrodeFill(95)}
                    strokeWidth="0.578"
                    d="M111.441 123H113.991V125.55H111.441z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                    className={"electrode" +  this.renderFeedbackClass(103)}
                    electrode_id="103"
                    fill={this.renderElectrodeFill(103)}
                    strokeWidth="0.578"
                    d="M114.191 123H116.741V125.55H114.191z"
                    display="inline"
                    stopColor="#000"
                >
                </path>
                <path
                    className={"electrode" +  this.renderFeedbackClass(111)}
                    electrode_id="111"
                    fill={this.renderElectrodeFill(111)}
                    strokeWidth="0.578"
                    d="M116.941 123H119.491V125.55H116.941z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(119)}
                    electrode_id="119"
                    fill={this.renderElectrodeFill(119)}
                    strokeWidth="0.578"
                    d="M119.691 123H122.241V125.55H119.691z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(121)}
                    electrode_id="121"
                    fill={this.renderElectrodeFill(121)}
                    strokeWidth="0.578"
                    d="M123.816 103.75H126.366V106.3H123.816z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(121)}
                    electrode_id="121"
                    fill={this.renderElectrodeFill(121)}
                    strokeWidth="0.578"
                    d="M123.816 109.25H126.366V111.8H123.816z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(126)}
                    electrode_id="126"
                    fill={this.renderElectrodeFill(126)}
                    strokeWidth="0.578"
                    d="M123.816 117.5H126.366V120.05H123.816z"
                    display="inline"
                    stopColor="#000"
                ></path>
                <path
                   className={"electrode" +  this.renderFeedbackClass(126)}
                    electrode_id="126"
                    fill={this.renderElectrodeFill(126)}
                    strokeWidth="0.578"
                    d="M123.816 123H126.366V125.55H123.816z"
                    display="inline"
                    stopColor="#000"
                ></path>
            </g>
        )
    }

    renderElectrodeFill(electrode_id) {
        //convert electrode id to i/j coordinates:
        var j = Math.floor(electrode_id / 8);
        var i = electrode_id % 8;

        //console.log("MODIFYING FRAME:")
        ////console.log(this.props.state.currently_edited_frame[0])
        ////console.log(this.state.frames)
        ////console.log(this.state.frames[this.props.state.currently_edited_frame[0]][i][j])
             //console.log("i=" + i + "j=" + j)
            //console.log(this.props.state.frames[this.props.state.currently_edited_frame[0]].electrodes[j][i])
        //console.log(this.props.state)
        if (this.props.state.frames[this.props.state.currently_edited_frame[0]].electrodes[j][i] !== null) {
           return ("#275599")
        } else if (this.props.state.currently_edited_frame[0] != 0) {
            //Previous frame have this electrode activated
            if (this.props.state.frames[this.props.state.currently_edited_frame[0] - 1].electrodes[j][i] !== null) 
            {
                return ("rgb(186, 183, 102)")
            }
        } else {
 
            return ("#efd94c")
        }
    }

    renderFeedbackClass(electrode_id) {
        //convert electrode id to i/j coordinates:
        var j = Math.floor(electrode_id / 8);
        var i = electrode_id % 8;

        //console.log("MODIFYING FRAME:")
        ////console.log(this.props.state.currently_edited_frame[0])
        ////console.log(this.state.frames)
        ////console.log(this.state.frames[this.props.state.currently_edited_frame[0]][i][j])
             //console.log("i=" + i + "j=" + j)
            //console.log(this.props.state.frames[this.props.state.currently_edited_frame[0]].electrodes[j][i])
        //console.log(this.props.state)
        if (this.props.state.electrodesFeedback[j][i] !== null) {
           return (" electrode_feedback_on ")
        } else {
 
            return ("")
        }
    }




    render() {
        return (
            <g onMouseUp={(e) => {this.props.state.resetClickAction(e)}}>
                {this.renderCartridge()}
                {this.renderElectrodes()}
            </g>
        )
    }
}
export default CartridgeComponent
