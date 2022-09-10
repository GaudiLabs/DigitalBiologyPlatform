import * as React from "react"

class CartridgeComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        electrodes: Array(16).fill(Array(8).fill(null)),
        serialPort: null
      };
    }
    render() { 
        return(
    <svg
    viewBox="0 0 100.149 74.773"
    xmlns="http://www.w3.org/2000/svg"
  >
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
    <g
        fill="#efd94c"
        fillOpacity="1"
        strokeLinejoin="round"
        display="inline"
        transform="translate(-53.01 -88.215)"
      >
        <path
          strokeWidth="0.578"
          d="M86.691 106.5H89.241V109.05H86.691z"
          display="inline"
          stopColor="#000"
          fill="#0F0"
        ></path>
        <path
          strokeWidth="0.578"
          d="M83.941 106.5H86.491V109.05H83.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M89.441 106.5H91.991V109.05H89.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M92.191 106.5H94.741V109.05H92.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M94.941 106.5H97.491V109.05H94.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M97.691 106.5H100.241V109.05H97.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M100.441 106.5H102.991V109.05H100.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M103.191 106.5H105.741V109.05H103.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M105.941 106.5H108.491V109.05H105.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M108.691 106.5H111.241V109.05H108.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M111.441 106.5H113.991V109.05H111.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M114.191 106.5H116.741V109.05H114.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M116.941 106.5H119.491V109.05H116.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M119.691 106.5H122.241V109.05H119.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M86.691 103.75H89.241V106.3H86.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M83.941 103.75H86.491V106.3H83.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M89.441 103.75H91.991V106.3H89.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M92.191 103.75H94.741V106.3H92.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M94.941 103.75H97.491V106.3H94.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M97.691 103.75H100.241V106.3H97.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M100.441 103.75H102.991V106.3H100.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M103.191 103.75H105.741V106.3H103.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M105.941 103.75H108.491V106.3H105.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M108.691 103.75H111.241V106.3H108.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M111.441 103.75H113.991V106.3H111.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M114.191 103.75H116.741V106.3H114.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M116.941 103.75H119.491V106.3H116.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M119.691 103.75H122.241V106.3H119.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M86.691 109.25H89.241V111.8H86.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M83.941 109.25H86.491V111.8H83.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M89.441 109.25H91.991V111.8H89.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M92.191 109.25H94.741V111.8H92.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M94.941 109.25H97.491V111.8H94.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M97.691 109.25H100.241V111.8H97.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M100.441 109.25H102.991V111.8H100.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M103.191 109.25H105.741V111.8H103.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M105.941 109.25H108.491V111.8H105.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M108.691 109.25H111.241V111.8H108.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M111.441 109.25H113.991V111.8H111.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M114.191 109.25H116.741V111.8H114.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M116.941 109.25H119.491V111.8H116.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M119.691 109.25H122.241V111.8H119.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M86.691 112H89.241V114.55H86.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M83.941 112H86.491V114.55H83.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M89.441 112H91.991V114.55H89.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M92.191 112H94.741V114.55H92.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M94.941 112H97.491V114.55H94.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M97.691 112H100.241V114.55H97.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M100.441 112H102.991V114.55H100.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M103.191 112H105.741V114.55H103.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M105.941 112H108.491V114.55H105.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M108.691 112H111.241V114.55H108.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M111.441 112H113.991V114.55H111.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M114.191 112H116.741V114.55H114.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M116.941 112H119.491V114.55H116.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M119.691 112H122.241V114.55H119.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M86.691 114.75H89.241V117.3H86.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M83.941 114.75H86.491V117.3H83.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M89.441 114.75H91.991V117.3H89.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M92.191 114.75H94.741V117.3H92.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M94.941 114.75H97.491V117.3H94.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M97.691 114.75H100.241V117.3H97.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M100.441 114.75H102.991V117.3H100.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M103.191 114.75H105.741V117.3H103.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M105.941 114.75H108.491V117.3H105.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M108.691 114.75H111.241V117.3H108.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M111.441 114.75H113.991V117.3H111.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M114.191 114.75H116.741V117.3H114.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M116.941 114.75H119.491V117.3H116.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M119.691 114.75H122.241V117.3H119.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M86.691 117.5H89.241V120.05H86.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M83.941 117.5H86.491V120.05H83.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M89.441 117.5H91.991V120.05H89.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M92.191 117.5H94.741V120.05H92.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M94.941 117.5H97.491V120.05H94.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M97.691 117.5H100.241V120.05H97.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M100.441 117.5H102.991V120.05H100.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M103.191 117.5H105.741V120.05H103.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M105.941 117.5H108.491V120.05H105.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M108.691 117.5H111.241V120.05H108.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M111.441 117.5H113.991V120.05H111.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M114.191 117.5H116.741V120.05H114.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M116.941 117.5H119.491V120.05H116.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M119.691 117.5H122.241V120.05H119.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M86.691 120.25H89.241V122.8H86.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M83.941 120.25H86.491V122.8H83.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M81.191 106.5H83.741V109.05H81.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M81.191 120.25H83.741V122.8H81.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="2.185"
          d="M291.275 402.52v9.636h14.834v-9.636h-9.638z"
          display="inline"
          stopColor="#000"
          transform="scale(.26458)"
        ></path>
        <path
          strokeWidth="2.185"
          d="M291.275 454.486v9.639h14.834v-9.639h-9.638z"
          display="inline"
          stopColor="#000"
          transform="scale(.26458)"
        ></path>
        <path
          strokeWidth="0.578"
          d="M89.441 120.25H91.991V122.8H89.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M92.191 120.25H94.741V122.8H92.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M94.941 120.25H97.491V122.8H94.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M97.691 120.25H100.241V122.8H97.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M100.441 120.25H102.991V122.8H100.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M103.191 120.25H105.741V122.8H103.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M105.941 120.25H108.491V122.8H105.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M108.691 120.25H111.241V122.8H108.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M111.441 120.25H113.991V122.8H111.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M114.191 120.25H116.741V122.8H114.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M116.941 120.25H119.491V122.8H116.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M119.691 120.25H122.241V122.8H119.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M122.441 106.5H124.991V109.05H122.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M122.441 120.25H124.991V122.8H122.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="2.185"
          d="M473.162 402.52v9.636H487.998v-9.636h-9.639z"
          display="inline"
          stopColor="#000"
          transform="scale(.26458)"
        ></path>
        <path
          strokeWidth="2.185"
          d="M473.162 454.486v9.639H487.998v-9.639h-9.639z"
          display="inline"
          stopColor="#000"
          transform="scale(.26458)"
        ></path>
        <path
          strokeWidth="0.578"
          d="M86.691 123H89.241V125.55H86.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M83.941 123H86.491V125.55H83.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M79.816 103.75H82.366V106.3H79.816z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M79.816 109.25H82.366V111.8H79.816z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M79.816 117.5H82.366V120.05H79.816z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M79.816 123H82.366V125.55H79.816z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="2.535"
          d="M266.639 392.125v30.426H300.912v-9.639H290.52v-11.148h10.392v-9.639h-12.98z"
          display="inline"
          stopColor="#000"
          transform="scale(.26458)"
        ></path>
        <path
          strokeWidth="0.671"
          d="M70.548 117.5v8.05h9.069V123h-2.75v-2.95h2.75v-2.55h-3.435z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.671"
          d="M135.634 103.749v8.05h-9.069v-2.55h2.75v-2.95h-2.75v-2.55H130z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.671"
          d="M135.634 117.5v8.05h-9.069V123h2.75v-2.95h-2.75v-2.55H130z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M89.441 123H91.991V125.55H89.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M92.191 123H94.741V125.55H92.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M94.941 123H97.491V125.55H94.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M97.691 123H100.241V125.55H97.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M100.441 123H102.991V125.55H100.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M103.191 123H105.741V125.55H103.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M105.941 123H108.491V125.55H105.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M108.691 123H111.241V125.55H108.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M111.441 123H113.991V125.55H111.441z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M114.191 123H116.741V125.55H114.191z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M116.941 123H119.491V125.55H116.941z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M119.691 123H122.241V125.55H119.691z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M123.816 103.75H126.366V106.3H123.816z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M123.816 109.25H126.366V111.8H123.816z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M123.816 117.5H126.366V120.05H123.816z"
          display="inline"
          stopColor="#000"
        ></path>
        <path
          strokeWidth="0.578"
          d="M123.816 123H126.366V125.55H123.816z"
          display="inline"
          stopColor="#000"
        ></path>
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
  </svg> 
)
}
}
export default CartridgeComponent
