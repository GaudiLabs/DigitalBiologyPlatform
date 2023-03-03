import * as React from "react"
//import './cartridge_DIMM.scss';

class GlassCartridgeComponent extends React.Component {

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
            <g fill="#efd94c" strokeWidth="0.425" color="#000">
            <path
              className={"electrode" +  this.renderFeedbackClass(57)}
              electrode_id="57"
              fill={this.renderElectrodeFill(57)}
              style={{ InkscapeStroke: "none" }}
              d="M19.334 20.621h9.025V32.9h-9.025z"
            ></path>
            <path
              className={"electrode" +  this.renderFeedbackClass(56)}
              electrode_id="56"
              fill={this.renderElectrodeFill(56)}

              style={{ InkscapeStroke: "none" }}
              d="M28.615 20.621h9.026v3.916h-2.088v4.43l2.087-.002v3.922l-9.026.013z"
            ></path>
            <path
              className={"electrode" +  this.renderFeedbackClass(48)}
              electrode_id="48"
              fill={this.renderElectrodeFill(48)}
              style={{ InkscapeStroke: "none" }}
              d="M35.808 24.793h3.92v3.916h-3.92z"
            ></path>
            <path
            //9
            className={"electrode" +  this.renderFeedbackClass(9)}
            electrode_id="9"
            fill={this.renderElectrodeFill(9)}
              style={{ InkscapeStroke: "none" }}
              d="M72.235 20.625h9.025v12.278h-9.025z"
            ></path>
           <path
            //1
            className={"electrode" +  this.renderFeedbackClass(1)}
            electrode_id="1"
            fill={this.renderElectrodeFill(1)}
              style={{ InkscapeStroke: "none" }}
              d="M62.953 20.625h9.026l.001 12.278-9.027-.012V28.97l2.087.001v-4.428h-2.087z"
            ></path>
            <path
            //0
            className={"electrode" +  this.renderFeedbackClass(0)}
            electrode_id="0"
            fill={this.renderElectrodeFill(0)}
              style={{ InkscapeStroke: "none" }}
              d="M64.786 24.797h-3.92v3.916h3.92z"
            ></path>

            <path
            //25
              className={"electrode" +  this.renderFeedbackClass(25)}
              electrode_id="25"
              fill={this.renderElectrodeFill(25)}
              style={{ InkscapeStroke: "none" }}
              d="M52.506 24.784h3.92V28.7h-3.92z"
            ></path>
            <path
            //16
              className={"electrode" +  this.renderFeedbackClass(16)}
              electrode_id="16"
              fill={this.renderElectrodeFill(16)}
              style={{ InkscapeStroke: "none" }}
              d="M52.506 28.962h3.92v3.917h-3.92z"
            ></path>
            <path
            //17
              className={"electrode" +  this.renderFeedbackClass(17)}
              electrode_id="17"
              fill={this.renderElectrodeFill(17)}
              style={{ InkscapeStroke: "none" }}
              d="M56.681 24.784h3.92V28.7h-3.92z"
            ></path>
            <path
            //8
              className={"electrode" +  this.renderFeedbackClass(8)}
              electrode_id="8"
              fill={this.renderElectrodeFill(8)}
              style={{ InkscapeStroke: "none" }}
              d="M56.681 28.962h3.92v3.917h-3.92z"
            ></path> 
                        <path
            //49
            className={"electrode" +  this.renderFeedbackClass(49)}
            electrode_id="49"
            fill={this.renderElectrodeFill(49)}
              style={{ InkscapeStroke: "none" }}
              d="M39.983 24.784h3.92V28.7h-3.92z"
            ></path>
            <path
            //40
              className={"electrode" +  this.renderFeedbackClass(40)}
              electrode_id="40"
              fill={this.renderElectrodeFill(40)}
              style={{ InkscapeStroke: "none" }}
              d="M39.983 28.962h3.92v3.917h-3.92z"
            ></path>
            <path
            //41
              className={"electrode" +  this.renderFeedbackClass(41)}
              electrode_id="41"
              fill={this.renderElectrodeFill(41)}
              style={{ InkscapeStroke: "none" }}
              d="M44.158 24.784h3.92V28.7h-3.92z"
            ></path>

            <path
            //32
              className={"electrode" +  this.renderFeedbackClass(32)}
              electrode_id="32"
              fill={this.renderElectrodeFill(32)}
              style={{ InkscapeStroke: "none" }}
              d="M44.158 28.962h3.92v3.917h-3.92z"
            ></path>
            <path
            //33
              className={"electrode" +  this.renderFeedbackClass(33)}
              electrode_id="33"
              fill={this.renderElectrodeFill(33)}
              style={{ InkscapeStroke: "none" }}
              d="M48.332 24.784h3.92V28.7h-3.92z"
            ></path>
            <path
            //24
              className={"electrode" +  this.renderFeedbackClass(24)}
              electrode_id="24"
              fill={this.renderElectrodeFill(24)}
              style={{ InkscapeStroke: "none" }}
              d="M48.332 28.962h3.92v3.917h-3.92z"
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
            <g onMouseUp={(e) => {this.props.state.resetClickAction(e)}} >
                {this.renderCartridge()}
                {this.renderElectrodes()}
            </g>
        )
    }
}
export default GlassCartridgeComponent
