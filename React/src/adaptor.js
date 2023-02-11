import * as React from "react"
import CartridgeComponent from './cartridge_DIMM';
import GlassCartridgeComponent from './cartridge_Glass';

class AdaptorComponent extends React.Component {

  constructor(props) {
    super(props);
    //console.log(this.props)
    this.state = {
      a : "b"
    }
  }

    renderAdaptorBoard() {
      return (
        <g
        style={{
          display: "inline",
        }}
        transform="translate(-53.01 -88.215)"
      >
        <path
          style={{
            fontVariationSettings: "normal",
            opacity: 1,
            fill: "red",
            fillOpacity: 0.99475,
            stroke: "#2f2f2f",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 4,
            strokeDasharray: "none",
            strokeDashoffset: 0,
            strokeOpacity: 1,
            stopColor: "#000",
            stopOpacity: 1,
          }}
          d="M53.14 88.29h99.944v17.149H53.14z"
        />
        <path
          d="M153.084 162.937v-69.52l-37.414.025a4.958 4.958 0 0 1-1.683 2.967 4.885 4.885 0 0 1-3.182 1.152H95.362a4.884 4.884 0 0 1-3.18-1.152 4.841 4.841 0 0 1-1.664-2.967l-37.433-.025v69.52l6 .001a6.485 6.485 0 0 0 5.625-3.249 6.491 6.491 0 0 1 5.624-3.25l65.5-.001c2.324 0 4.47 1.24 5.628 3.255a6.477 6.477 0 0 0 5.622 3.245z"
          style={{
            fill: "red",
            fillOpacity: 0.988877,
            stroke: "#2e2e2e",
            strokeWidth: 0.1,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
        />
        <path
          d="m53.085 93.417 37.433.025a4.841 4.841 0 0 0 1.664 2.967c.89.75 2.018 1.159 3.18 1.152h15.443a4.885 4.885 0 0 0 3.182-1.152 4.958 4.958 0 0 0 1.683-2.967l37.414-.025v12.022H53.085Z"
          style={{
            fontVariationSettings: "normal",
            opacity: 1,
            vectorEffect: "none",
            fill: "#4d4d4d",
            fillOpacity: 0.99475,
            stroke: "#2f2f2f",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 4,
            strokeDasharray: "none",
            strokeDashoffset: 0,
            strokeOpacity: 1,
            InkscapeStroke: "none",
            stopColor: "#000",
            stopOpacity: 1,
          }}
        />
        <circle
          cx={59.085}
          cy={159.439}
          r={3.1}
          style={{
            fill: "#008484",
            fillOpacity: 0,
            stroke: "#f4f4f4",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          fill="none"
        />
        <circle
          cx={147.085}
          cy={159.439}
          r={3.1}
          style={{
            fill: "#008484",
            fillOpacity: 0,
            stroke: "#f4f4f4",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          fill="none"
        />
        <path
          d="M64.713 159.689h-.008M141.464 159.689l-.005.008"
          style={{
            fill: "#c2c200",
            fillOpacity: 0,
            stroke: "#303030",
            strokeWidth: 0.1,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          fill="none"
        />
        <path
          d="m115.658 93.466.025-.049M90.524 93.417l-.012.049"
          style={{
            fill: "#c2c200",
            fillOpacity: 0,
            stroke: "#c2c200",
            strokeWidth: 0.1,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          fill="none"
        />
        <circle
          cx={136.585}
          cy={133.939}
          r={1.05}
          style={{
            fill: "#c2c200",
            fillOpacity: 0,
            stroke: "#c2c200",
            strokeWidth: 0.1,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          fill="none"
        />
        <circle
          cx={69.585}
          cy={133.939}
          r={1.05}
          style={{
            fill: "#c2c200",
            fillOpacity: 0,
            stroke: "#c2c200",
            strokeWidth: 0.1,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          fill="none"
        />
        <g
          transform="translate(.491 -7.648)"
          style={{
            stroke: "#303030",
            strokeOpacity: 1,
          }}
        >
          <circle
            style={{
              fontVariationSettings: "normal",
              opacity: 1,
              fill: "#666",
              fillOpacity: 1,
              stroke: "#303030",
              strokeWidth: 0.15,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 4,
              strokeDasharray: "none",
              strokeDashoffset: 0,
              strokeOpacity: 1,
              stopColor: "#000",
              stopOpacity: 1,
            }}
            cx={58.593}
            cy={167.087}
            r={2.35}
          />
          <path
            style={{
              fontVariationSettings: "normal",
              display: "inline",
              vectorEffect: "none",
              fill: "#333",
              fillOpacity: 1,
              stroke: "#303030",
              strokeWidth: 0.1,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              strokeDasharray: "none",
              strokeDashoffset: 0,
              strokeOpacity: 1,
              InkscapeStroke: "none",
              stopColor: "#000",
            }}
            d="M58.896 167.907c-.016.144-.018.907-.096.944-.048.021-.205.019-.205.019s-.156.003-.204-.019c-.078-.037-.08-.8-.096-.944-.015-.145-.308-.248-.308-.248s-.103-.292-.247-.308c-.144-.016-.908-.018-.945-.096-.02-.047-.018-.204-.018-.204s-.003-.157.018-.204c.037-.078.8-.08.945-.096.144-.016.247-.308.247-.308s.293-.104.309-.248c.015-.144.017-.907.095-.945.048-.02.205-.018.205-.018s.156-.003.204.018c.078.038.08.801.096.945.015.144.308.248.308.248s.103.292.247.308c.144.016.908.018.945.096.021.047.018.204.018.204s.003.157-.018.204c-.037.078-.8.08-.945.096-.144.016-.247.308-.247.308s-.293.103-.308.248z"
          />
        </g>
        <g
          transform="translate(88.491 -7.648)"
          style={{
            display: "inline",
            stroke: "#303030",
            strokeOpacity: 1,
          }}
        >
          <circle
            style={{
              fontVariationSettings: "normal",
              opacity: 1,
              fill: "#666",
              fillOpacity: 1,
              stroke: "#303030",
              strokeWidth: 0.15,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 4,
              strokeDasharray: "none",
              strokeDashoffset: 0,
              strokeOpacity: 1,
              stopColor: "#000",
              stopOpacity: 1,
            }}
            cx={58.593}
            cy={167.087}
            r={2.35}
          />
          <path
            style={{
              fontVariationSettings: "normal",
              display: "inline",
              vectorEffect: "none",
              fill: "#333",
              fillOpacity: 1,
              stroke: "#303030",
              strokeWidth: 0.1,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              strokeDasharray: "none",
              strokeDashoffset: 0,
              strokeOpacity: 1,
              InkscapeStroke: "none",
              stopColor: "#000",
            }}
            d="M58.896 167.907c-.016.144-.018.907-.096.944-.048.021-.205.019-.205.019s-.156.003-.204-.019c-.078-.037-.08-.8-.096-.944-.015-.145-.308-.248-.308-.248s-.103-.292-.247-.308c-.144-.016-.908-.018-.945-.096-.02-.047-.018-.204-.018-.204s-.003-.157.018-.204c.037-.078.8-.08.945-.096.144-.016.247-.308.247-.308s.293-.104.309-.248c.015-.144.017-.907.095-.945.048-.02.205-.018.205-.018s.156-.003.204.018c.078.038.08.801.096.945.015.144.308.248.308.248s.103.292.247.308c.144.016.908.018.945.096.021.047.018.204.018.204s.003.157-.018.204c-.037.078-.8.08-.945.096-.144.016-.247.308-.247.308s-.293.103-.308.248z"
          />
        </g>
        <g
          transform="translate(88.491 -67.648)"
          style={{
            display: "inline",
            stroke: "#303030",
            strokeOpacity: 1,
          }}
        >
          <circle
            style={{
              fontVariationSettings: "normal",
              opacity: 1,
              fill: "#666",
              fillOpacity: 1,
              stroke: "#303030",
              strokeWidth: 0.15,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 4,
              strokeDasharray: "none",
              strokeDashoffset: 0,
              strokeOpacity: 1,
              stopColor: "#000",
              stopOpacity: 1,
            }}
            cx={58.593}
            cy={167.087}
            r={2.35}
          />
          <path
            style={{
              fontVariationSettings: "normal",
              display: "inline",
              vectorEffect: "none",
              fill: "#333",
              fillOpacity: 1,
              stroke: "#303030",
              strokeWidth: 0.1,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              strokeDasharray: "none",
              strokeDashoffset: 0,
              strokeOpacity: 1,
              InkscapeStroke: "none",
              stopColor: "#000",
            }}
            d="M58.896 167.907c-.016.144-.018.907-.096.944-.048.021-.205.019-.205.019s-.156.003-.204-.019c-.078-.037-.08-.8-.096-.944-.015-.145-.308-.248-.308-.248s-.103-.292-.247-.308c-.144-.016-.908-.018-.945-.096-.02-.047-.018-.204-.018-.204s-.003-.157.018-.204c.037-.078.8-.08.945-.096.144-.016.247-.308.247-.308s.293-.104.309-.248c.015-.144.017-.907.095-.945.048-.02.205-.018.205-.018s.156-.003.204.018c.078.038.08.801.096.945.015.144.308.248.308.248s.103.292.247.308c.144.016.908.018.945.096.021.047.018.204.018.204s.003.157-.018.204c-.037.078-.8.08-.945.096-.144.016-.247.308-.247.308s-.293.103-.308.248z"
          />
        </g>
        <g
          transform="translate(.491 -67.648)"
          style={{
            display: "inline",
            stroke: "#303030",
            strokeOpacity: 1,
          }}
        >
          <circle
            style={{
              fontVariationSettings: "normal",
              opacity: 1,
              fill: "#666",
              fillOpacity: 1,
              stroke: "#303030",
              strokeWidth: 0.15,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 4,
              strokeDasharray: "none",
              strokeDashoffset: 0,
              strokeOpacity: 1,
              stopColor: "#000",
              stopOpacity: 1,
            }}
            cx={58.593}
            cy={167.087}
            r={2.35}
          />
          <path
            style={{
              fontVariationSettings: "normal",
              display: "inline",
              vectorEffect: "none",
              fill: "#333",
              fillOpacity: 1,
              stroke: "#303030",
              strokeWidth: 0.1,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              strokeDasharray: "none",
              strokeDashoffset: 0,
              strokeOpacity: 1,
              InkscapeStroke: "none",
              stopColor: "#000",
            }}
            d="M58.896 167.907c-.016.144-.018.907-.096.944-.048.021-.205.019-.205.019s-.156.003-.204-.019c-.078-.037-.08-.8-.096-.944-.015-.145-.308-.248-.308-.248s-.103-.292-.247-.308c-.144-.016-.908-.018-.945-.096-.02-.047-.018-.204-.018-.204s-.003-.157.018-.204c.037-.078.8-.08.945-.096.144-.016.247-.308.247-.308s.293-.104.309-.248c.015-.144.017-.907.095-.945.048-.02.205-.018.205-.018s.156-.003.204.018c.078.038.08.801.096.945.015.144.308.248.308.248s.103.292.247.308c.144.016.908.018.945.096.021.047.018.204.018.204s.003.157-.018.204c-.037.078-.8.08-.945.096-.144.016-.247.308-.247.308s-.293.103-.308.248z"
          />
        </g>
      </g>
      )
    }

    renderConnector() {
      return (
        <g
        transform="translate(-48.878 -69.498)"
        style={{
          display: "inline",
        }}
      >
        <path
          d="m145.404 126.94.281-.49.172-.688.038-.5v-.442l.007-.485-.01-.142.086-.603.202-.562.286-.425.286-.39.118-.109.002-.995-5.697.013c-.405 2.371 2.76 3.893 4.229 5.818z"
          style={{
            fontVariationSettings: "normal",
            display: "inline",
            vectorEffect: "none",
            fill: "#ddc580",
            fillOpacity: 1,
            stroke: "#303030",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 4,
            strokeDasharray: "none",
            strokeDashoffset: 0,
            strokeOpacity: 1,
            InkscapeStroke: "none",
            stopColor: "#000",
          }}
        />
        <circle
          cx={132.438}
          cy={115.21}
          r={1.05}
          style={{
            display: "inline",
            fill: "#c2c200",
            fillOpacity: 0,
            stroke: "#c2c200",
            strokeWidth: 0.1,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          fill="none"
        />
        <circle
          cx={65.437}
          cy={115.21}
          r={1.05}
          style={{
            display: "inline",
            fill: "#c2c200",
            fillOpacity: 0,
            stroke: "#c2c200",
            strokeWidth: 0.1,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          fill="none"
        />
        <path
          d="m52.468 126.954-.281-.49-.172-.689-.038-.5.001-.442-.008-.485.01-.142-.086-.603-.202-.561-.286-.426-.285-.39-.12-.109-.001-.995 5.697.013c.406 2.372-2.76 3.893-4.229 5.819z"
          style={{
            display: "inline",
            fill: "#ddc580",
            fillOpacity: 1,
            stroke: "#303030",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
        />
        <path
          d="M99.836 125.862H59.293l-.064-5.299h-2.542l-.001.793v.411h-3.685c-.36-.003-.503.216-.508.478v14.117h7.402v-4.028h39.941v4.028h2.985v-4.028h35.143v4.028h7.402v-14.117c-.005-.262-.147-.48-.508-.478h-3.686l.001-.411v-.793h-2.543l-.064 5.299h-35.745Z"
          style={{
            display: "inline",
            fill: "#4d4d4d",
            fillOpacity: 0.99475,
            stroke: "#2f2f2f",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
        />
        <path
          d="M102.82 132.334h-2.984M100.311 135.029h2.035"
          style={{
            display: "inline",
            fill: "#008484",
            fillOpacity: 0,
            stroke: "#303030",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          fill="none"
        />
        <path
          d="M102.346 136.362v.318h-2.035v-.318z"
          style={{
            display: "inline",
            fill: "#e6e6e6",
            fillOpacity: 0.990763,
            stroke: "#303030",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 4,
            strokeDasharray: "none",
            strokeOpacity: 1,
          }}
        />
        <path
          d="M55.51 118.564h3.369"
          style={{
            display: "inline",
            fill: "#008484",
            fillOpacity: 0,
            stroke: "#303030",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          fill="none"
        />
        <path
          d="M141.172 120.139h-2.319c-.385-.018-.804-.498-.778-.948.026-.45.451-.86.905-.86h4.702v-.318l.731-.317-.16-.318.732-.35-.127-.285.698-.348-.127-.317.699-.351c.17-.068.74-.016.764.478l-.02 4.904-5.7.013z"
          style={{
            fontVariationSettings: "normal",
            display: "inline",
            vectorEffect: "none",
            fill: "#f5e3b5",
            fillOpacity: 1,
            stroke: "#303030",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 4,
            strokeDasharray: "none",
            strokeDashoffset: 0,
            strokeOpacity: 1,
            InkscapeStroke: "none",
            stopColor: "#000",
          }}
        />
        <path
          d="M56.7 120.152h2.319c.385-.018.804-.497.778-.948-.025-.45-.451-.86-.905-.86H54.19v-.318l-.731-.317.16-.318-.732-.35.127-.285-.698-.348.127-.317-.699-.35c-.17-.069-.74-.016-.764.477l.02 4.904 5.7.013z"
          style={{
            display: "inline",
            fill: "#f5e3b5",
            fillOpacity: 1,
            stroke: "#303030",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
        />
        <path
          d="M141.172 121.767v-.411M144.54 132.334v4.028M142.379 136.362v-4.028"
          style={{
            display: "inline",
            fill: "#008484",
            fillOpacity: 0,
            stroke: "#303030",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          fill="none"
        />
        <path
          d="M143.969 136.362h-4.003v.318h4.003z"
          style={{
            display: "inline",
            fill: "#fff",
            fillOpacity: 0.999605,
            stroke: "#303030",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
        />
        <path
          d="M57.893 136.362H53.89v.318h4.003z"
          style={{
            display: "inline",
            fill: "#f2f2f2",
            fillOpacity: 0.979837,
            stroke: "#303030",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
        />
        <path
          d="m55.48 132.334-.19-5.713M52.524 136.362v-14.117M55.48 132.334v4.028M53.352 136.362v-4.028M53.352 136.362h2.128M53.352 136.362h-.828M55.48 136.362h4.415M100.28 136.362v-4.028M100.311 136.362h-.03M53.352 132.334l.157-5.713M144.35 126.621l.19 5.713M142.379 132.334l.19-5.713M137.614 132.334l-.224-6.472"
          style={{
            display: "inline",
            fill: "#008484",
            fillOpacity: 0,
            stroke: "#303030",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          fill="none"
        />
        <path
          style={{
            fontVariationSettings: "normal",
            display: "inline",
            vectorEffect: "none",
            fill: "#ddc580",
            fillOpacity: 1,
            stroke: "#303030",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 4,
            strokeDasharray: "none",
            strokeDashoffset: 0,
            strokeOpacity: 1,
            InkscapeStroke: "none",
            stopColor: "#000",
          }}
          d="M144.354 126.763a.896.894 0 0 1-.897.895.896.894 0 0 1-.896-.895.896.894 0 0 1 .896-.894.896.894 0 0 1 .897.894zM55.29 126.763a.896.894 0 0 1-.896.895.896.894 0 0 1-.897-.895.896.894 0 0 1 .897-.894.896.894 0 0 1 .896.894z"
        />
        <path
          d="M102.376 132.334v4.028M102.346 136.362h.03"
          style={{
            display: "inline",
            fill: "#008484",
            fillOpacity: 0,
            stroke: "#303030",
            strokeWidth: 0.15,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeOpacity: 1,
          }}
          fill="none"
        />
      </g>
      )
    }



    render() { 
      var renderedCartridge = <CartridgeComponent state={this.props.state}/> 
      switch (this.props.state.currentCartridge) {
        case "glass":
          renderedCartridge = <GlassCartridgeComponent state={this.props.state}/>
      }
        return(
    <svg
    viewBox="0 0 101.149 74.773"
    xmlns="http://www.w3.org/2000/svg"
    >
    {this.renderAdaptorBoard()}
    {/* <CartridgeComponent state={this.props.state}/> */}
    {renderedCartridge}
    
    {this.renderConnector()}
  </svg> 
)
}
}
export default AdaptorComponent
